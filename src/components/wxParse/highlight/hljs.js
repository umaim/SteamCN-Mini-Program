import hljs from './highlight.js';
import php from '../highlight/languages/php.js';
import shell from '../highlight/languages/shell.js';
import java from '../highlight/languages/java.js';
import javascript from '../highlight/languages/javascript.js';
import go from '../highlight/languages/go.js';
import xml from '../highlight/languages/xml.js';
import css from '../highlight/languages/css.js';
import bash from '../highlight/languages/bash.js';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('go', go);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

export default hljs;