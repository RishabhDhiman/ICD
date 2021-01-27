const express = require("express");
const bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
const got = require("got");
var request = require("sync-request");
app.use(bodyParser.json());
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var ArrayList = require("arraylist");
var finalList = new ArrayList;
var address = new ArrayList();
var count = 1;
var file = 0;
var node = "S";
app.use(bodyParser.urlencoded({ extended: true }));
var filNmae = node + ".json";
fs.appendFileSync(filNmae, "[", (err) => {
  if (err) {
    console.log("Failed");
    return;
  }
  console.log("Inserted");
});
app.listen(process.env.PORT || 3003);
subCategory();

function subCategory() {
  var v = 0;
  var total = 0;
  var url = "https://www.hcpcsdata.com/Codes/" + node;
  var res = request("GET", url);
  var response = new JSDOM(res.getBody().toString());
  var list = Array.from(response.window.document.getElementsByClassName("clickable-row"));
  total = list.length;
  list.forEach(item => {
   var mItem = {};
    mItem.HCPCSCode = item.cells[0].querySelector("a").textContent;
    var href = "https://www.hcpcsdata.com" + item.cells[0].querySelector("a").getAttribute("href");
    var page = request("GET", href);
    mItem.code = node;
    var jsdom=(new JSDOM(page.getBody().toString()));
    mItem.Description = jsdom.window.document.querySelector("h5").textContent;
    mItem.ShortDescription =jsdom.window.document.querySelector("tbody").getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML.trim();
    var betos = -1;
    var addedOn = -1;
    var relatedCode = -1;
    var medicareCoverageStatus = -1;
    var shortDescription = -1;
    var tbody = jsdom.window.document.querySelector("tbody").getElementsByTagName("tr");
    var asd = jsdom.window.document.querySelector("tbody").getElementsByTagName("tr");
    for (i = 0; i <jsdom.window.document.querySelector("tbody").getElementsByTagName("tr").length; i++) {
      if (asd[i].getElementsByTagName("td")[0].innerHTML.trim().includes("Short Description")) {
        shortDescription = i;
      }
      else if (asd[i].getElementsByTagName("td")[0].innerHTML.trim().includes("HCPCS Code Added Date")) {
        addedOn = i;
      }

      else if (asd[i].getElementsByTagName("td")[0].innerHTML.trim().includes("HCPCS Cross Reference Code")) {
        relatedCode = i;
      }

      else if (asd[i].getElementsByTagName("td")[0].innerHTML.trim().includes("HCPCS Type Of Service Code")) {
        betos = i;
      }

      else if (asd[i].getElementsByTagName("td")[0].innerHTML.trim().includes("HCPCS Coverage Code")) {
        medicareCoverageStatus = i;
      }
    }
    mItem.CodeDescription = "2020/2021 HCPCS Code " + item.cells[0].querySelector("a").textContent + "\n    \n" + mItem.Description + "\n\n" + "    * Added on: " + (new JSDOM(page.getBody().toString())).window.document.querySelector("tbody").getElementsByTagName("tr")[addedOn].getElementsByTagName("td")[1].innerHTML.trim();
    if (relatedCode == -1) {
      //mItem.BETOSClassification = (new JSDOM(page.getBody().toString())).window.document.querySelector("tbody").getElementsByTagName("tr")[8].getElementsByTagName("td")[1].innerHTML.trim();
      mItem.CodeDescription = mItem.CodeDescription + "\n    * BETOS Classification: " + tbody[betos].getElementsByTagName("td")[1].innerHTML.trim() + "\n    * Medicare coverage status: " + tbody[medicareCoverageStatus].getElementsByTagName("td")[1].innerHTML.trim();
    }
    else {
      //  mItem.BETOSClassification = (new JSDOM(page.getBody().toString())).window.document.querySelector("tbody").getElementsByTagName("tr")[7].getElementsByTagName("td")[1].innerHTML.trim();
      //mItem.RelatedCodes = 
      mItem.CodeDescription = mItem.CodeDescription + "\n    * See related codes: " + tbody[relatedCode].getElementsByTagName("td")[1].querySelector("a").innerHTML + "\n    * BETOS Classification: " + tbody[betos].getElementsByTagName("td")[1].innerHTML.trim() + "\n    * Medicare coverage status: " + tbody[medicareCoverageStatus].getElementsByTagName("td")[1].innerHTML.trim();
    }
    //mItem.MedicareCoverageStatus = (new JSDOM(page.getBody().toString())).window.document.querySelector("tbody").getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.trim();
    //mItem.AddedOn = (new JSDOM(page.getBody().toString())).window.document.querySelector("tbody").getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML.trim();
    fs.appendFileSync(filNmae, "," + JSON.stringify(mItem), "utf-8", (err) => {
      if (err) {
        console.log("Failed");
        return;
      }
      console.log("Inserted");
    });
    v++;
    console.log(v + " Item Added of " + total);
    //finalList.add(mItem);
    mItem=null;
    jsdom=null;
    mItem=null;
    tbody = null;
    asd = null;
    betos = null;
    addedOn = null;
    relatedCode = null;
    medicareCoverageStatus = null;
    shortDescription = null;
  }
  );
}
function subSubCategory(element) {
  var res = request(
    "GET",
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false"
  );
  element = null;
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      if (element.averageDepth >= 3) {
        address.add(element);
        console.log(count++ + " Items Address To List");
      }
      subSubSubCategory(element);
      element = null;
    } else {
      address.add(element);
      console.log(count++ + " Items Address To List");
      element = null;
    }
  });
}

function getDetails(element) {
  console.log(file++ + " Record Inserted of " + count);
  var mItem = {};
  var res = request(
    "GET",
    "https://icd.who.int/browse11/l-m/en/GetConcept?ConceptId=" + element.ID
  );
  var dom = new JSDOM(res.getBody().toString());
  var defination = Array.from(
    dom.window.document.getElementsByClassName("definition")
  );
  var codingNote = Array.from(
    dom.window.document.getElementsByClassName("codingnote")
  );
  var node = Array.from(
    dom.window.document.getElementsByClassName("inclusion")
  );
  var item = "";
  for (i = 0; i < defination.length; i++) {
    if (i === 0) {
      item += "<p>Description</p><ul>";
    }
    item += "<li><p>" + defination[i].innerHTML.trim() + "</p></li>";
    if (i === defination.length - 1) {
      item += "</ul>";
    }
  }
  for (i = 0; i < codingNote.length; i++) {
    if (i === 0) {
      item += "<p>Coding Note</p><ul>";
    }
    item += "<li><p>" + codingNote[i].innerHTML.trim() + "</p></li>";
    if (i === codingNote.length - 1) {
      item += "</ul>";
    }
  }
  for (i = 0; i < node.length; i++) {
    if (i === 0) {
      item += "<p>Inclusions</p><ul>";
    }
    item += "<li><p>" + node[i].innerHTML.trim() + "</p></li>";
    if (i === node.length - 1) {
      item += "</ul>";
    }
  }
  mItem.longDesc = item;
  mItem.code = element.label.substr(0, element.label.indexOf(" "));
  mItem.shortDesc = element.label.substr(element.label.indexOf(" ") + 1);
  mItem.DescId = mItem.code.substr(0, element.label.indexOf("."));
  if (mItem.code.substr(0, element.label.indexOf(".")) === "") {
    mItem.DescId = mItem.code;
  }
  fs.appendFileSync(filNmae, "," + JSON.stringify(mItem), (err) => {
    if (err) {
      console.log("Failed");
      return;
    }
    console.log("Inserted");
  });
  element = null;
  dom = null;
  res = null;
  mItem = null;
}
