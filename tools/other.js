import { BooWysiwygeDirectTool } from '../direct-tool.js';
import {formatSubscriptIcon, formatSuperscriptIcon} from '../icons.js';

class Redo extends BooWysiwygeDirectTool {
  iconName() { return 'redo' }
  title() { return '重做'; }
  command() { return 'redo'; }
}

class Undo extends BooWysiwygeDirectTool {
  iconName() { return 'undo' }
  title() { return '撤销'; }
  command() { return 'undo'; }
}

class Unlink extends BooWysiwygeDirectTool {
  iconName() { return 'link_off' }
  title() { return '取消链接'; }
  command() { return 'unlink'; }
}

class RemoveFormat extends BooWysiwygeDirectTool {
  iconName() { return 'format_clear'; }
  title() { return '取消格式'; }
  command() { return 'removeformat'; }
}

class SubScript extends BooWysiwygeDirectTool {
  icon() { return formatSubscriptIcon; }
  title() { return '下标'; }
  command() { return 'subscript'; }
}

class SuperScript extends BooWysiwygeDirectTool {
  icon() { return formatSuperscriptIcon; }
  title() { return '上标'; }
  command() { return 'superscript'; }
}

window.customElements.define('boo-wysiwyg-remove-format', RemoveFormat);
window.customElements.define('boo-wysiwyg-unlink', Unlink);
window.customElements.define('boo-wysiwyg-undo', Undo);
window.customElements.define('boo-wysiwyg-redo', Redo);
window.customElements.define('boo-wysiwyg-subscript', SubScript);
window.customElements.define('boo-wysiwyg-superscript', SuperScript);