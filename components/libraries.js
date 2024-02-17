const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;

async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      `http://localhost:2025/library-data.kml`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadLibraries() {
  xml = await loadXml();
  return xml.querySelectorAll("Placemark");

}
// async function getLibraryById(id) {
//   xml = await loadXml(); //XML DOM document
//   let xpathQuery = `//Location[LocationID/text()='${id}']`;
//   let result = xml.evaluate(
//     xpathQuery,
//     xml,
//     parkNS,
//     4, //UNORDERED_NODE_ITERATOR_TYPE
//     null //put any existing XPathResult object or null to return a new one
//   );
//   //If receiving an iterator, to loop over results, use result.iterateNext()
//   return result.iterateNext(); //can do this because we're only expecting one result
// }

module.exports = {
  loadLibraries,
  //getParkById
};