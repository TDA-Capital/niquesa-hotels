(function($) {

CKEDITOR.disableAutoInline = true;

Drupal.wysiwyg.editor.init.ckeditor = function(settings) {
  // Plugins must only be loaded once. Only the settings from the first format
  // will be used but they're identical anyway.
  var registeredPlugins = {};
  for (var format in settings) {
    if (Drupal.settings.wysiwyg.plugins[format]) {
      // Register native external plugins.
      // Array syntax required; 'native' is a predefined token in JavaScript.
      for (var pluginName in Drupal.settings.wysiwyg.plugins[format]['native']) {
        if (!registeredPlugins[pluginName]) {
          var plugin = Drupal.settings.wysiwyg.plugins[format]['native'][pluginName];
          CKEDITOR.plugins.addExternal(pluginName, plugin.path, plugin.fileName);
          registeredPlugins[pluginName] = true;
        }
      }
      // Register Drupal plugins.
      for (var pluginName in Drupal.settings.wysiwyg.plugins[format].drupal) {
        if (!registeredPlugins[pluginName]) {
          Drupal.wysiwyg.editor.instance.ckeditor.addPlugin(pluginName, Drupal.settings.wysiwyg.plugins[format].drupal[pluginName], Drupal.settings.wysiwyg.plugins.drupal[pluginName]);
          registeredPlugins[pluginName] = true;
        }
      }
    }
    // Register Font styles (versions 3.2.1 and above).
    if (Drupal.settings.wysiwyg.configs.ckeditor[format].stylesSet) {
      CKEDITOR.stylesSet.add(format, Drupal.settings.wysiwyg.configs.ckeditor[format].stylesSet);
    }
  }
};


/**
 * Attach this editor to a target element.
 */
Drupal.wysiwyg.editor.attach.ckeditor = function(context, params, settings) {
  // Apply editor instance settings.
  CKEDITOR.config.customConfig = '';

  var $drupalToolbars = $('#toolbar, #admin-menu', Drupal.overlayChild ? window.parent.document : document);
  if (!settings.height) {
    settings.height = $('#' + params.field).height();
  }
  settings.on = {
    instanceReady: function(ev) {
      var editor = ev.editor;
      // Get a list of block, list and table tags from CKEditor's XHTML DTD.
      // @see http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Output_Formatting.
      var dtd = CKEDITOR.dtd;
      var tags = CKEDITOR.tools.extend({}, dtd.$block, dtd.$listItem, dtd.$tableContent);
      // Set source formatting rules for each listed tag except <pre>.
      // Linebreaks can be inserted before or after opening and closing tags.
      if (settings.simple_source_formatting) {
        // Mimic FCKeditor output, by breaking lines between tags.
        for (var tag in tags) {
          if (tag == 'pre') {
            continue;
          }
          this.dataProcessor.writer.setRules(tag, {
            indent: true,
            breakBeforeOpen: true,
            breakAfterOpen: false,
            breakBeforeClose: false,
            breakAfterClose: true
          });
        }
      }
      else {
        // CKEditor adds default formatting to <br>, so we want to remove that
        // here too.
        tags.br = 1;
        // No indents or linebreaks;
        for (var tag in tags) {
          if (tag == 'pre') {
            continue;
          }
          this.dataProcessor.writer.setRules(tag, {
            indent: false,
            breakBeforeOpen: false,
            breakAfterOpen: false,
            breakBeforeClose: false,
            breakAfterClose: false
          });
        }
      }
    },

    pluginsLoaded: function(ev) {
      // Override the conversion methods to let Drupal plugins modify the data.
      var editor = ev.editor;
      if (editor.dataProcessor && Drupal.settings.wysiwyg.plugins[params.format]) {
        editor.dataProcessor.toHtml = CKEDITOR.tools.override(editor.dataProcessor.toHtml, function(originalToHtml) {
          // Convert raw data for display in WYSIWYG mode.
          return function(data, fixForBody) {
            for (var plugin in Drupal.settings.wysiwyg.plugins[params.format].drupal) {
              if (typeof Drupal.wysiwyg.plugins[plugin].attach == 'function') {
                data = Drupal.wysiwyg.plugins[plugin].attach(data, Drupal.settings.wysiwyg.plugins.drupal[plugin], editor.name);
                data = Drupal.wysiwyg.instances[params.field].prepareContent(data);
              }
            }
            return originalToHtml.call(this, data, fixForBody);
          };
        });
        editor.dataProcessor.toDataFormat = CKEDITOR.tools.override(editor.dataProcessor.toDataFormat, function(originalToDataFormat) {
          // Convert WYSIWYG mode content to raw data.
          return function(data, fixForBody) {
            data = originalToDataFormat.call(this, data, fixForBody);
            for (var plugin in Drupal.settings.wysiwyg.plugins[params.format].drupal) {
              if (typeof Drupal.wysiwyg.plugins[plugin].detach == 'function') {
                data = Drupal.wysiwyg.plugins[plugin].detach(data, Drupal.settings.wysiwyg.plugins.drupal[plugin], editor.name);
              }
            }
            return data;
          };
        });
      }
    },

    selectionChange: function (event) {
      var pluginSettings = Drupal.settings.wysiwyg.plugins[params.format];
      if (pluginSettings && pluginSettings.drupal) {
        $.each(pluginSettings.drupal, function (name) {
          var plugin = Drupal.wysiwyg.plugins[name];
          if ($.isFunction(plugin.isNode)) {
            var node = event.data.selection.getSelectedElement();
            var state = plugin.isNode(node ? node.$ : null) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
            event.editor.getCommand(name).setState(state);
          }
        });
      }
    },

    focus: function(ev) {
      Drupal.wysiwyg.activeId = ev.editor.name;
    },

    afterCommandExec: function(ev) {
      // Fix Drupal toolbar obscuring editor toolbar in fullscreen mode.
      if (ev.data.name != 'maximize') {
        return;
      }
      if (ev.data.command.state == CKEDITOR.TRISTATE_ON) {
        $drupalToolbars.hide();
      }
      else {
        $drupalToolbars.show();
      }
    }
  };

  // Attach editor.
  CKEDITOR.replace(params.field, settings);
};

/**
 * Detach a single or all editors.
 *
 * @todo 3.x: editor.prototype.getInstances() should always return an array
 *   containing all instances or the passed in params.field instance, but
 *   always return an array to simplify all detach functions.
 */
Drupal.wysiwyg.editor.detach.ckeditor = function (context, params, trigger) {
  var method = (trigger == 'serialize') ? 'updateElement' : 'destroy';
  if (typeof params != 'undefined') {
    var instance = CKEDITOR.instances[params.field];
    if (instance) {
      instance[method]();
    }
  }
  else {
    for (var instanceName in CKEDITOR.instances) {
      if (CKEDITOR.instances.hasOwnProperty(instanceName)) {
        CKEDITOR.instances[instanceName][method]();
      }
    }
  }
};

Drupal.wysiwyg.editor.instance.ckeditor = {
  addPlugin: function(pluginName, settings, pluginSettings) {
    CKEDITOR.plugins.add(pluginName, {
      // Wrap Drupal plugin in a proxy pluygin.
      init: function(editor) {
        if (settings.css) {
          editor.on('mode', function(ev) {
            if (ev.editor.mode == 'wysiwyg') {
              // Inject CSS files directly into the editing area head tag.
              var iframe = $('#cke_contents_' + ev.editor.name + ' iframe, #' + ev.editor.id + '_contents iframe');
              $('head', iframe.eq(0).contents()).append('<link rel="stylesheet" href="' + settings.css + '" type="text/css" >');
            }
          });
        }
        if (typeof Drupal.wysiwyg.plugins[pluginName].invoke == 'function') {
          var pluginCommand = {
            exec: function (editor) {
              var data = { format: 'html', node: null, content: '' };
              var selection = editor.getSelection();
              if (selection) {
                data.node = selection.getSelectedElement();
                if (data.node) {
                  data.node = data.node.$;
                }
                if (selection.getType() == CKEDITOR.SELECTION_TEXT) {
                  data.content = selection.getSelectedText();
                }
                else if (data.node) {
                  // content is supposed to contain the "outerHTML".
                  data.content = data.node.parentNode.innerHTML;
                }
              }
              Drupal.wysiwyg.plugins[pluginName].invoke(data, pluginSettings, editor.name);
            }
          };
          editor.addCommand(pluginName, pluginCommand);
        }
        editor.ui.addButton(pluginName, {
          label: settings.iconTitle,
          command: pluginName,
          icon: settings.icon
        });

        // @todo Add button state handling.
      }
    });
  },
  prepareContent: function(content) {
    // @todo Don't know if we need this yet.
    return content;
  },

  insert: function(content) {
    content = this.prepareContent(content);
    if (CKEDITOR.env.webkit || CKEDITOR.env.chrome || CKEDITOR.env.opera || CKEDITOR.env.safari) {
      // Works around a WebKit bug which removes wrapper elements.
      // @see https://drupal.org/node/1927968
      var tmp = new CKEDITOR.dom.element('div'), children, skip = 0, item;
      tmp.setHtml(content);
      children = tmp.getChildren();
      skip = 0;
      while (children.count() > skip) {
        item = children.getItem(skip);
        switch(item.type) {
          case 1:
            CKEDITOR.instances[this.field].insertElement(item);
            break;
          case 3:
            CKEDITOR.instances[this.field].insertText(item.getText());
            skip++;
            break;
          case 8:
            CKEDITOR.instances[this.field].insertHtml(item.getOuterHtml());
            skip++;
            break;
        }
      }
    }
    else {
      CKEDITOR.instances[this.field].insertHtml(content);
    }
  },

  setContent: function (content) {
    CKEDITOR.instances[this.field].setData(content);
  },

  getContent: function () {
    return CKEDITOR.instances[this.field].getData();
  }
};

})(jQuery);
;
(function($) {

/**
 * Attach this editor to a target element.
 *
 * @param context
 *   A DOM element, supplied by Drupal.attachBehaviors().
 * @param params
 *   An object containing input format parameters. Default parameters are:
 *   - editor: The internal editor name.
 *   - theme: The name/key of the editor theme/profile to use.
 *   - field: The CSS id of the target element.
 * @param settings
 *   An object containing editor settings for all enabled editor themes.
 */
Drupal.wysiwyg.editor.attach.none = function(context, params, settings) {
  if (params.resizable) {
    var $wrapper = $('#' + params.field, context).parents('.form-textarea-wrapper:first');
    $wrapper.addClass('resizable');
    if (Drupal.behaviors.textarea) {
      Drupal.behaviors.textarea.attach(context);
    }
  }
};

/**
 * Detach a single or all editors.
 *
 * The editor syncs its contents back to the original field before its instance
 * is removed.
 *
 * @param context
 *   A DOM element, supplied by Drupal.attachBehaviors().
 * @param params
 *   (optional) An object containing input format parameters. If defined,
 *   only the editor instance in params.field should be detached. Otherwise,
 *   all editors should be detached and saved, so they can be submitted in
 *   AJAX/AHAH applications.
 * @param trigger
 *   A string describing why the editor is being detached.
 *   Possible triggers are:
 *   - unload: (default) Another or no editor is about to take its place.
 *   - move: Currently expected to produce the same result as unload.
 *   - serialize: The form is about to be serialized before an AJAX request or
 *     a normal form submission. If possible, perform a quick detach and leave
 *     the editor's GUI elements in place to avoid flashes or scrolling issues.
 * @see Drupal.detachBehaviors
 */
Drupal.wysiwyg.editor.detach.none = function (context, params, trigger) {
  if (typeof params != 'undefined' && (trigger != 'serialize')) {
    var $wrapper = $('#' + params.field, context).parents('.form-textarea-wrapper:first');
    $wrapper.removeOnce('textarea').removeClass('.resizable-textarea').removeClass('resizable')
      .find('.grippie').remove();
  }
};

/**
 * Instance methods for plain text areas.
 */
Drupal.wysiwyg.editor.instance.none = {
  insert: function(content) {
    var editor = document.getElementById(this.field);

    // IE support.
    if (document.selection) {
      editor.focus();
      var sel = document.selection.createRange();
      sel.text = content;
    }
    // Mozilla/Firefox/Netscape 7+ support.
    else if (editor.selectionStart || editor.selectionStart == '0') {
      var startPos = editor.selectionStart;
      var endPos = editor.selectionEnd;
      editor.value = editor.value.substring(0, startPos) + content + editor.value.substring(endPos, editor.value.length);
    }
    // Fallback, just add to the end of the content.
    else {
      editor.value += content;
    }
  },

  setContent: function (content) {
    $('#' + this.field).val(content);
  },

  getContent: function () {
    return $('#' + this.field).val();
  }
};

})(jQuery);
;
(function ($) {

// @todo Array syntax required; 'break' is a predefined token in JavaScript.
Drupal.wysiwyg.plugins['break'] = {

  /**
   * Return whether the passed node belongs to this plugin.
   */
  isNode: function(node) {
    return ($(node).is('img.wysiwyg-break'));
  },

  /**
   * Execute the button.
   */
  invoke: function(data, settings, instanceId) {
    if (data.format == 'html') {
      // Prevent duplicating a teaser break.
      if ($(data.node).is('img.wysiwyg-break')) {
        return;
      }
      var content = this._getPlaceholder(settings);
    }
    else {
      // Prevent duplicating a teaser break.
      // @todo data.content is the selection only; needs access to complete content.
      if (data.content.match(/<!--break-->/)) {
        return;
      }
      var content = '<!--break-->';
    }
    if (typeof content != 'undefined') {
      Drupal.wysiwyg.instances[instanceId].insert(content);
    }
  },

  /**
   * Replace all <!--break--> tags with images.
   */
  attach: function(content, settings, instanceId) {
    content = content.replace(/<!--break-->/g, this._getPlaceholder(settings));
    return content;
  },

  /**
   * Replace images with <!--break--> tags in content upon detaching editor.
   */
  detach: function(content, settings, instanceId) {
    var $content = $('<div>' + content + '</div>'); // No .outerHTML() in jQuery :(
    // #404532: document.createComment() required or IE will strip the comment.
    // #474908: IE 8 breaks when using jQuery methods to replace the elements.
    // @todo Add a generic implementation for all Drupal plugins for this.
    $.each($('img.wysiwyg-break', $content), function (i, elem) {
      elem.parentNode.insertBefore(document.createComment('break'), elem);
      elem.parentNode.removeChild(elem);
    });
    return $content.html();
  },

  /**
   * Helper function to return a HTML placeholder.
   */
  _getPlaceholder: function (settings) {
    return '<img src="' + settings.path + '/images/spacer.gif" alt="&lt;--break-&gt;" title="&lt;--break--&gt;" class="wysiwyg-break drupal-content" />';
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;

(function ($) {

/**
 * Auto-hide summary textarea if empty and show hide and unhide links.
 */
Drupal.behaviors.textSummary = {
  attach: function (context, settings) {
    $('.text-summary', context).once('text-summary', function () {
      var $widget = $(this).closest('div.field-type-text-with-summary');
      var $summaries = $widget.find('div.text-summary-wrapper');

      $summaries.once('text-summary-wrapper').each(function(index) {
        var $summary = $(this);
        var $summaryLabel = $summary.find('label');
        var $full = $widget.find('.text-full').eq(index).closest('.form-item');
        var $fullLabel = $full.find('label');

        // Create a placeholder label when the field cardinality is
        // unlimited or greater than 1.
        if ($fullLabel.length == 0) {
          $fullLabel = $('<label></label>').prependTo($full);
        }

        // Setup the edit/hide summary link.
        var $link = $('<span class="field-edit-link">(<a class="link-edit-summary" href="#">' + Drupal.t('Hide summary') + '</a>)</span>').toggle(
          function () {
            $summary.hide();
            $(this).find('a').html(Drupal.t('Edit summary')).end().appendTo($fullLabel);
            return false;
          },
          function () {
            $summary.show();
            $(this).find('a').html(Drupal.t('Hide summary')).end().appendTo($summaryLabel);
            return false;
          }
        ).appendTo($summaryLabel);

        // If no summary is set, hide the summary field.
        if ($(this).find('.text-summary').val() == '') {
          $link.click();
        }
        return;
      });
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Automatically display the guidelines of the selected text format.
 */
Drupal.behaviors.filterGuidelines = {
  attach: function (context) {
    $('.filter-guidelines', context).once('filter-guidelines')
      .find(':header').hide()
      .closest('.filter-wrapper').find('select.filter-list')
      .bind('change', function () {
        $(this).closest('.filter-wrapper')
          .find('.filter-guidelines-item').hide()
          .siblings('.filter-guidelines-' + this.value).show();
      })
      .change();
  }
};

})(jQuery);
;

/**
 * @file: Popup dialog interfaces for the media project.
 *
 * Drupal.media.popups.mediaBrowser
 *   Launches the media browser which allows users to pick a piece of media.
 *
 * Drupal.media.popups.mediaStyleSelector
 *  Launches the style selection form where the user can choose
 *  what format / style they want their media in.
 *
 */

(function ($) {
namespace('Drupal.media.popups');

/**
 * Media browser popup. Creates a media browser dialog.
 *
 * @param {function}
 *          onSelect Callback for when dialog is closed, received (Array
 *          media, Object extra);
 * @param {Object}
 *          globalOptions Global options that will get passed upon initialization of the browser.
 *          @see Drupal.media.popups.mediaBrowser.getDefaults();
 *
 * @param {Object}
 *          pluginOptions Options for specific plugins. These are passed
 *          to the plugin upon initialization.  If a function is passed here as
 *          a callback, it is obviously not passed, but is accessible to the plugin
 *          in Drupal.settings.variables.
 *
 *          Example
 *          pluginOptions = {library: {url_include_patterns:'/foo/bar'}};
 *
 * @param {Object}
 *          widgetOptions Options controlling the appearance and behavior of the
 *          modal dialog.
 *          @see Drupal.media.popups.mediaBrowser.getDefaults();
 */
Drupal.media.popups.mediaBrowser = function (onSelect, globalOptions, pluginOptions, widgetOptions) {
  var options = Drupal.media.popups.mediaBrowser.getDefaults();
  options.global = $.extend({}, options.global, globalOptions);
  options.plugins = pluginOptions;
  options.widget = $.extend({}, options.widget, widgetOptions);

  // Create it as a modal window.
  var browserSrc = options.widget.src;
  if ($.isArray(browserSrc) && browserSrc.length) {
    browserSrc = browserSrc[browserSrc.length - 1];
  }
  // Params to send along to the iframe.  WIP.
  var params = {};
  $.extend(params, options.global);
  params.plugins = options.plugins;

  browserSrc += '&' + $.param(params);
  var mediaIframe = Drupal.media.popups.getPopupIframe(browserSrc, 'mediaBrowser');
  // Attach the onLoad event
  mediaIframe.bind('load', options, options.widget.onLoad);

  /**
   * Setting up the modal dialog
   */
  var ok = 'OK';
  var notSelected = 'You have not selected anything!';

  if (Drupal && Drupal.t) {
    ok = Drupal.t(ok);
    notSelected = Drupal.t(notSelected);
  }

  // @todo: let some options come through here. Currently can't be changed.
  var dialogOptions = options.dialog;

  dialogOptions.buttons[ok] = function () {
    var selected = this.contentWindow.Drupal.media.browser.selectedMedia;
    if (selected.length < 1) {
      alert(notSelected);
      return;
    }
    onSelect(selected);
    $(this).dialog("close");
  };

  var dialog = mediaIframe.dialog(dialogOptions);

  Drupal.media.popups.sizeDialog(dialog);
  Drupal.media.popups.resizeDialog(dialog);
  Drupal.media.popups.scrollDialog(dialog);
  Drupal.media.popups.overlayDisplace(dialog.parents(".ui-dialog"));

  return mediaIframe;
};

Drupal.media.popups.mediaBrowser.mediaBrowserOnLoad = function (e) {
  var options = e.data;
  if (this.contentWindow.Drupal.media == undefined) return;

  if (this.contentWindow.Drupal.media.browser.selectedMedia.length > 0) {
    var ok = (Drupal && Drupal.t) ? Drupal.t('OK') : 'OK';
    var ok_func = $(this).dialog('option', 'buttons')[ok];
    ok_func.call(this);
    return;
  }
};

Drupal.media.popups.mediaBrowser.getDefaults = function () {
  return {
    global: {
      types: [], // Types to allow, defaults to all.
      activePlugins: [] // If provided, a list of plugins which should be enabled.
    },
    widget: { // Settings for the actual iFrame which is launched.
      src: Drupal.settings.media.browserUrl, // Src of the media browser (if you want to totally override it)
      onLoad: Drupal.media.popups.mediaBrowser.mediaBrowserOnLoad // Onload function when iFrame loads.
    },
    dialog: Drupal.media.popups.getDialogOptions()
  };
};

Drupal.media.popups.mediaBrowser.finalizeSelection = function () {
  var selected = this.contentWindow.Drupal.media.browser.selectedMedia;
  if (selected.length < 1) {
    alert(notSelected);
    return;
  }
  onSelect(selected);
  $(this).dialog("close");
}

/**
 * Style chooser Popup. Creates a dialog for a user to choose a media style.
 *
 * @param mediaFile
 *          The mediaFile you are requesting this formatting form for.
 *          @todo: should this be fid?  That's actually all we need now.
 *
 * @param Function
 *          onSubmit Function to be called when the user chooses a media
 *          style. Takes one parameter (Object formattedMedia).
 *
 * @param Object
 *          options Options for the mediaStyleChooser dialog.
 */
Drupal.media.popups.mediaStyleSelector = function (mediaFile, onSelect, options) {
  var defaults = Drupal.media.popups.mediaStyleSelector.getDefaults();
  // @todo: remove this awful hack :(
  if (typeof defaults.src === 'string' ) {
    defaults.src = defaults.src.replace('-media_id-', mediaFile.fid) + '&fields=' + encodeURIComponent(JSON.stringify(mediaFile.fields));
  }
  else {
    var src = defaults.src.shift();
    defaults.src.unshift(src);
    defaults.src = src.replace('-media_id-', mediaFile.fid) + '&fields=' + encodeURIComponent(JSON.stringify(mediaFile.fields));
  }
  options = $.extend({}, defaults, options);
  // Create it as a modal window.
  var mediaIframe = Drupal.media.popups.getPopupIframe(options.src, 'mediaStyleSelector');
  // Attach the onLoad event
  mediaIframe.bind('load', options, options.onLoad);

  /**
   * Set up the button text
   */
  var ok = 'OK';
  var notSelected = 'Very sorry, there was an unknown error embedding media.';

  if (Drupal && Drupal.t) {
    ok = Drupal.t(ok);
    notSelected = Drupal.t(notSelected);
  }

  // @todo: let some options come through here. Currently can't be changed.
  var dialogOptions = Drupal.media.popups.getDialogOptions();

  dialogOptions.buttons[ok] = function () {

    var formattedMedia = this.contentWindow.Drupal.media.formatForm.getFormattedMedia();
    if (!formattedMedia) {
      alert(notSelected);
      return;
    }
    onSelect(formattedMedia);
    $(this).dialog("close");
  };

  var dialog = mediaIframe.dialog(dialogOptions);

  Drupal.media.popups.sizeDialog(dialog);
  Drupal.media.popups.resizeDialog(dialog);
  Drupal.media.popups.scrollDialog(dialog);
  Drupal.media.popups.overlayDisplace(dialog.parents(".ui-dialog"));

  return mediaIframe;
};

Drupal.media.popups.mediaStyleSelector.mediaBrowserOnLoad = function (e) {
};

Drupal.media.popups.mediaStyleSelector.getDefaults = function () {
  return {
    src: Drupal.settings.media.styleSelectorUrl,
    onLoad: Drupal.media.popups.mediaStyleSelector.mediaBrowserOnLoad
  };
};


/**
 * Style chooser Popup. Creates a dialog for a user to choose a media style.
 *
 * @param mediaFile
 *          The mediaFile you are requesting this formatting form for.
 *          @todo: should this be fid?  That's actually all we need now.
 *
 * @param Function
 *          onSubmit Function to be called when the user chooses a media
 *          style. Takes one parameter (Object formattedMedia).
 *
 * @param Object
 *          options Options for the mediaStyleChooser dialog.
 */
Drupal.media.popups.mediaFieldEditor = function (fid, onSelect, options) {
  var defaults = Drupal.media.popups.mediaFieldEditor.getDefaults();
  // @todo: remove this awful hack :(
  defaults.src = defaults.src.replace('-media_id-', fid);
  options = $.extend({}, defaults, options);
  // Create it as a modal window.
  var mediaIframe = Drupal.media.popups.getPopupIframe(options.src, 'mediaFieldEditor');
  // Attach the onLoad event
  // @TODO - This event is firing too early in IE on Windows 7,
  // - so the height being calculated is too short for the content.
  mediaIframe.bind('load', options, options.onLoad);

  /**
   * Set up the button text
   */
  var ok = 'OK';
  var notSelected = 'Very sorry, there was an unknown error embedding media.';

  if (Drupal && Drupal.t) {
    ok = Drupal.t(ok);
    notSelected = Drupal.t(notSelected);
  }

  // @todo: let some options come through here. Currently can't be changed.
  var dialogOptions = Drupal.media.popups.getDialogOptions();

  dialogOptions.buttons[ok] = function () {
    var formattedMedia = this.contentWindow.Drupal.media.formatForm.getFormattedMedia();
    if (!formattedMedia) {
      alert(notSelected);
      return;
    }
    onSelect(formattedMedia);
    $(this).dialog("close");
  };

  var dialog = mediaIframe.dialog(dialogOptions);

  Drupal.media.popups.sizeDialog(dialog);
  Drupal.media.popups.resizeDialog(dialog);
  Drupal.media.popups.scrollDialog(dialog);
  Drupal.media.popups.overlayDisplace(dialog);

  return mediaIframe;
};

Drupal.media.popups.mediaFieldEditor.mediaBrowserOnLoad = function (e) {

};

Drupal.media.popups.mediaFieldEditor.getDefaults = function () {
  return {
    // @todo: do this for real
    src: '/media/-media_id-/edit?render=media-popup',
    onLoad: Drupal.media.popups.mediaFieldEditor.mediaBrowserOnLoad
  };
};


/**
 * Generic functions to both the media-browser and style selector
 */

/**
 * Returns the commonly used options for the dialog.
 */
Drupal.media.popups.getDialogOptions = function () {
  return {
    buttons: {},
    dialogClass: Drupal.settings.media.dialogOptions.dialogclass,
    modal: Drupal.settings.media.dialogOptions.modal,
    draggable: Drupal.settings.media.dialogOptions.draggable,
    resizable: Drupal.settings.media.dialogOptions.resizable,
    minWidth: Drupal.settings.media.dialogOptions.minwidth,
    width: Drupal.settings.media.dialogOptions.width,
    height: Drupal.settings.media.dialogOptions.height,
    position: Drupal.settings.media.dialogOptions.position,
    overlay: {
      backgroundColor: Drupal.settings.media.dialogOptions.overlay.backgroundcolor,
      opacity: Drupal.settings.media.dialogOptions.overlay.opacity
    },
    zIndex: Drupal.settings.media.dialogOptions.zindex,
    close: function (event, ui) {
      $(event.target).remove();
    }
  };
};

/**
 * Get an iframe to serve as the dialog's contents. Common to both plugins.
 */
Drupal.media.popups.getPopupIframe = function (src, id, options) {
  var defaults = {width: '100%', scrolling: 'auto'};
  var options = $.extend({}, defaults, options);

  return $('<iframe class="media-modal-frame"/>')
  .attr('src', src)
  .attr('width', options.width)
  .attr('id', id)
  .attr('scrolling', options.scrolling);
};

Drupal.media.popups.overlayDisplace = function (dialog) {
  if (parent.window.Drupal.overlay && jQuery.isFunction(parent.window.Drupal.overlay.getDisplacement)) {
    var overlayDisplace = parent.window.Drupal.overlay.getDisplacement('top');
    if (dialog.offset().top < overlayDisplace) {
      dialog.css('top', overlayDisplace);
    }
  }
}

/**
 * Size the dialog when it is first loaded and keep it centered when scrolling.
 *
 * @param jQuery dialogElement
 *  The element which has .dialog() attached to it.
 */
Drupal.media.popups.sizeDialog = function (dialogElement) {
  if (!dialogElement.is(':visible')) {
    return;
  }
  var windowWidth = $(window).width();
  var dialogWidth = windowWidth * 0.8;
  var windowHeight = $(window).height();
  var dialogHeight = windowHeight * 0.8;

  dialogElement.dialog("option", "width", dialogWidth);
  dialogElement.dialog("option", "height", dialogHeight);
  dialogElement.dialog("option", "position", 'center');

  $('.media-modal-frame').width('100%');
}

/**
 * Resize the dialog when the window changes.
 *
 * @param jQuery dialogElement
 *  The element which has .dialog() attached to it.
 */
Drupal.media.popups.resizeDialog = function (dialogElement) {
  $(window).resize(function() {
    Drupal.media.popups.sizeDialog(dialogElement);
  });
}

/**
 * Keeps the dialog centered when the window is scrolled.
 *
 * @param jQuery dialogElement
 *  The element which has .dialog() attached to it.
 */
Drupal.media.popups.scrollDialog = function (dialogElement) {
  // Keep the dialog window centered when scrolling.
  $(window).scroll(function() {
    if (!dialogElement.is(':visible')) {
      return;
    }
    dialogElement.dialog("option", "position", 'center');
  });
}

})(jQuery);
;
/**
 * @file
 * Provides JavaScript additions to the media field widget.
 *
 * This file provides support for launching the media browser to select existing
 * files and disabling of other media fields during Ajax uploads (which prevents
 * separate media fields from accidentally attaching files).
 */

(function ($) {

/**
 * Attach behaviors to media element browse fields.
 */
Drupal.behaviors.mediaElement = {
  attach: function (context, settings) {
    if (settings.media && settings.media.elements) {
      $.each(settings.media.elements, function(selector) {
        $(selector, context).once('media-browser-launch', function () {
          var configuration = settings.media.elements[selector];
          // The user has JavaScript enabled, so display the browse field and hide
          // the upload and attach fields which are only used as a fallback in
          // case the user is unable to use the media browser.
          $(selector, context).children('.browse').show();
          $(selector, context).children('.upload').hide();
          $(selector, context).children('.attach').hide();
          $(selector, context).children('.browse').bind('click', {configuration: configuration}, Drupal.media.openBrowser);
        });
      });
    }
  }
};

/**
 * Attach behaviors to the media attach and remove buttons.
 */
Drupal.behaviors.mediaButtons = {
  attach: function (context) {
    $('input.form-submit', context).bind('mousedown', Drupal.media.disableFields);
  },
  detach: function (context) {
    $('input.form-submit', context).unbind('mousedown', Drupal.media.disableFields);
  }
};

/**
 * Media attach utility functions.
 */
Drupal.media = Drupal.media || {};

/**
 * Opens the media browser with the element's configuration settings.
 */
Drupal.media.openBrowser = function (event) {
  var clickedButton = this;
  var configuration = event.data.configuration.global;

  // Find the file ID, preview and upload fields.
  var fidField = $(this).siblings('.fid');
  var previewField = $(this).siblings('.preview');
  var uploadField = $(this).siblings('.upload');

  // Find the edit and remove buttons.
  var editButton = $(this).siblings('.edit');
  var removeButton = $(this).siblings('.remove');

  // Launch the media browser.
  Drupal.media.popups.mediaBrowser(function (mediaFiles) {
    // Ensure that there was at least one media file selected.
    if (mediaFiles.length < 0) {
      return;
    }

    // Grab the first of the selected media files.
    var mediaFile = mediaFiles[0];

    // Set the value of the hidden file ID field and trigger a change.
    uploadField.val(mediaFile.fid);
    uploadField.trigger('change');

    // Find the attach button and automatically trigger it.
    var attachButton = uploadField.siblings('.attach');
    attachButton.trigger('mousedown');

    // Display a preview of the file using the selected media file's display.
    previewField.html(mediaFile.preview);
  }, configuration);

  return false;
};

/**
 * Prevent media browsing when using buttons not intended to browse.
 */
Drupal.media.disableFields = function (event) {
  var clickedButton = this;

  // Only disable browse fields for Ajax buttons.
  if (!$(clickedButton).hasClass('ajax-processed')) {
    return;
  }

  // Check if we're working with an "Attach" button.
  var $enabledFields = [];
  if ($(this).closest('div.media-widget').length > 0) {
    $enabledFields = $(this).closest('div.media-widget').find('input.attach');
  }

  // Temporarily disable attach fields other than the one we're currently
  // working with. Filter out fields that are already disabled so that they
  // do not get enabled when we re-enable these fields at the end of behavior
  // processing. Re-enable in a setTimeout set to a relatively short amount
  // of time (1 second). All the other mousedown handlers (like Drupal's Ajax
  // behaviors) are excuted before any timeout functions are called, so we
  // don't have to worry about the fields being re-enabled too soon.
  // @todo If the previous sentence is true, why not set the timeout to 0?
  var $fieldsToTemporarilyDisable = $('div.media-widget input.attach').not($enabledFields).not(':disabled');
  $fieldsToTemporarilyDisable.attr('disabled', 'disabled');
  setTimeout(function (){
    $fieldsToTemporarilyDisable.attr('disabled', false);
  }, 1000);
};

})(jQuery);

;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.menuFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).drupalSetSummary(function (context) {
      if ($('.form-item-menu-enabled input', context).is(':checked')) {
        return Drupal.checkPlain($('.form-item-menu-link-title input', context).val());
      }
      else {
        return Drupal.t('Not in menu');
      }
    });
  }
};

/**
 * Automatically fill in a menu link title, if possible.
 */
Drupal.behaviors.menuLinkAutomaticTitle = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).each(function () {
      // Try to find menu settings widget elements as well as a 'title' field in
      // the form, but play nicely with user permissions and form alterations.
      var $checkbox = $('.form-item-menu-enabled input', this);
      var $link_title = $('.form-item-menu-link-title input', context);
      var $title = $(this).closest('form').find('.form-item-title input');
      // Bail out if we do not have all required fields.
      if (!($checkbox.length && $link_title.length && $title.length)) {
        return;
      }
      // If there is a link title already, mark it as overridden. The user expects
      // that toggling the checkbox twice will take over the node's title.
      if ($checkbox.is(':checked') && $link_title.val().length) {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      }
      // Whenever the value is changed manually, disable this behavior.
      $link_title.keyup(function () {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      });
      // Global trigger on checkbox (do not fill-in a value when disabled).
      $checkbox.change(function () {
        if ($checkbox.is(':checked')) {
          if (!$link_title.data('menuLinkAutomaticTitleOveridden')) {
            $link_title.val($title.val());
          }
        }
        else {
          $link_title.val('');
          $link_title.removeData('menuLinkAutomaticTitleOveridden');
        }
        $checkbox.closest('fieldset.vertical-tabs-pane').trigger('summaryUpdated');
        $checkbox.trigger('formUpdated');
      });
      // Take over any title change.
      $title.keyup(function () {
        if (!$link_title.data('menuLinkAutomaticTitleOveridden') && $checkbox.is(':checked')) {
          $link_title.val($title.val());
          $link_title.val($title.val()).trigger('formUpdated');
        }
      });
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.pathFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.path-form', context).drupalSetSummary(function (context) {
      var path = $('.form-item-path-alias input').val();
      var automatic = $('.form-item-path-pathauto input').attr('checked');

      if (automatic) {
        return Drupal.t('Automatic alias');
      }
      if (path) {
        return Drupal.t('Alias: @alias', { '@alias': path });
      }
      else {
        return Drupal.t('No alias');
      }
    });
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.redirectFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.redirect-list', context).drupalSetSummary(function (context) {
      if ($('table.redirect-list tbody td.empty', context).size()) {
        return Drupal.t('No redirects');
      }
      else {
        var redirects = $('table.redirect-list tbody tr').size();
        return Drupal.formatPlural(redirects, '1 redirect', '@count redirects');
      }
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.outerWidth());
  }
};

})(jQuery);
;
/**
 * @file
 * Custom JS for controlling the Metatag vertical tab.
 */

(function ($) {
  'use strict';

Drupal.behaviors.metatagFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.metatags-form', context).drupalSetSummary(function (context) {
      var vals = [];
      $("input[type='text'], select, textarea", context).each(function() {
        var input_field = $(this).attr('name');
        // Verify the field exists before proceeding.
        if (input_field === undefined) {
          return false;
        }
        var default_name = input_field.replace(/\[value\]/, '[default]');
        var default_value = $("input[type='hidden'][name='" + default_name + "']", context);
        if (default_value.length && default_value.val() === $(this).val()) {
          // Meta tag has a default value and form value matches default value.
          return true;
        }
        else if (!default_value.length && !$(this).val().length) {
          // Meta tag has no default value and form value is empty.
          return true;
        }
        var label = $("label[for='" + $(this).attr('id') + "']").text();
        vals.push(Drupal.t('@label: @value', {
          '@label': $.trim(label),
          '@value': Drupal.truncate($(this).val(), 25) || Drupal.t('None')
        }));
      });
      if (vals.length === 0) {
        return Drupal.t('Using defaults');
      }
      else {
        return vals.join('<br />');
      }
    });
  }
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.truncate = function (str, limit) {
  if (str.length > limit) {
    return str.substr(0, limit) + '...';
  }
  else {
    return str;
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.nodeFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.node-form-revision-information', context).drupalSetSummary(function (context) {
      var revisionCheckbox = $('.form-item-revision input', context);

      // Return 'New revision' if the 'Create new revision' checkbox is checked,
      // or if the checkbox doesn't exist, but the revision log does. For users
      // without the "Administer content" permission the checkbox won't appear,
      // but the revision log will if the content type is set to auto-revision.
      if (revisionCheckbox.is(':checked') || (!revisionCheckbox.length && $('.form-item-log textarea', context).length)) {
        return Drupal.t('New revision');
      }

      return Drupal.t('No revision');
    });

    $('fieldset.node-form-author', context).drupalSetSummary(function (context) {
      var name = $('.form-item-name input', context).val() || Drupal.settings.anonymous,
        date = $('.form-item-date input', context).val();
      return date ?
        Drupal.t('By @name on @date', { '@name': name, '@date': date }) :
        Drupal.t('By @name', { '@name': name });
    });

    $('fieldset.node-form-options', context).drupalSetSummary(function (context) {
      var vals = [];

      $('input:checked', context).parent().each(function () {
        vals.push(Drupal.checkPlain($.trim($(this).text())));
      });

      if (!$('.form-item-status input', context).is(':checked')) {
        vals.unshift(Drupal.t('Not published'));
      }
      return vals.join(', ');
    });
  }
};

})(jQuery);
;
