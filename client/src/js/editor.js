// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      console.log(data);
      console.info('Loaded data from IndexedDB, injecting into editor');

      // Check if data exists and has content
      if (data && data.content) {
        // Set editor value using data or fallback options
        this.editor.setValue(data.content || localData || header);
      } else {
        // If no data exists, initialize IndexedDB with default content
        initDb().then(() => {
          // Re-fetch data after initialization
          getDb().then((newData) => {
            this.editor.setValue(newData.content || localData || header);
          });
        }).catch((error) => {
            // Handle errors during initialization (optional)
            console.error("Error initializing IndexedDB:", error);
        });
      }
    }).catch((error) => {
        // Handle errors during data retrieval (optional)
        console.error("Error retrieving data from IndexedDB:", error);
    });

    // Update local storage on editor change
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save content to IndexedDB on editor blur
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}