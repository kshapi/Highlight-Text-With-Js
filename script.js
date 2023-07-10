const query = document.getElementById('search');
const textContent = document.getElementById('text');


// Find all text nodes in the article
const treeWalker = document.createTreeWalker(textContent, NodeFilter.SHOW_TEXT);
const allTextNodes = [];
let currentNode = treeWalker.nextNode();
//
for (let i = 0; i < currentNode.length; i++) {
  allTextNodes.push(currentNode);
  currentNode = treeWalker.nextNode();
};


const highlight = ({target}) => {
  const str = target.value.toLowerCase().trim();
  
    //Browser Support,
    if (!CSS.highlights) {
      article.textContent = "CSS Custom Highlight API not supported.";
      return;
    };
  //Clear highlights in Each input
  CSS.highlights.clear();
  
  if (str) {
    //Loop all text and find matches
    const ranges = allTextNodes
      .map(elem => {
        return {
          elem,
          text: elem.textContent.toLowerCase()
        };
      })
      .map(({ text, elem }) => {
        const indices = [];
        let start = 0;
    
        for (let i = 0; i < text.length; i++) {
          const index = text.indexOf(str, start);
          if (index === -1) break;
          indices.push(index);
          start = index + str.length;
        };
        // Create a range object for each instance of str
        return indices.map(index => {
          const range = new Range();
          range.setStart(elem, index);
          range.setEnd(elem, index + str.length);
          return range;
        });
      });
    
    //Highlight object for the ranges
    const results = new Highlight(...ranges.flat());
    // Register the Highlight object in the registry.
    CSS.highlights.set('My-Search', results);
  };
  
};
//Listener for input
query.addEventListener('input', highlight);

//Kshapi