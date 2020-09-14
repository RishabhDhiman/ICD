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
var address = new ArrayList();
var count = 1;
var file = 0;
app.use(bodyParser.urlencoded({ extended: true }));
/* function checkAndNotifyEarthquake() {
  var res = request(
    "GET",
    "https://icd.who.int/browse11/l-m/en/JsonGetRootConcepts?useHtml=false"
  );
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    subCategory(element);
  });

  console.log("\n\n\n\n\n\n\n\n Completed");
} */
var filNmae = "21 Symptoms, signs or clinical findings, not elsewhere classified.json";
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
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    "http://id.who.int/icd/entity/1843895818" +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      if (element.averageDepth >= 3) {
        address.add(element);
        console.log(count++ + " Items Address To List");
      }
      subSubCategory(element);
      element = null;
    } else {
      address.add(element);
      console.log(count++ + " Items Address To List");
      element = null;
    }
  });
  subSubSubSubSubSubSubCategory = null;
  subSubSubSubSubSubCategory = null;
  subSubSubSubSubCategory = null;
  subSubSubSubCategory = null;
  subSubSubCategory = null;
  subSubCategory = null;
  subCategory = null;
  console.log("\n\n\n\n\n\n\n\n Completed Item's Found" + address.length);

  address.forEach((element) => {
    getDetails(element);
    element = null;
  });

  console.log("\n\n\n\n\n\n\n\n Completed Item's Saved" + address.length);
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

function subSubSubCategory(element) {
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
      subSubSubSubCategory(element);
      element = null;
    } else {
      address.add(element);
      console.log(count++ + " Items Address To List");
      element = null;
    }
  });
}
function subSubSubSubCategory(element) {
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
      subSubSubSubSubCategory(element);
      element = null;
    } else {
      address.add(element);
      console.log(count++ + " Items Address To List");
      element = null;
    }
  });
}

function subSubSubSubSubCategory(element) {
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
      subSubSubSubSubSubCategory(element);
      element = null;
    } else {
      address.add(element);
      console.log(count++ + " Items Address To List");
      element = null;
    }
  });
}

function subSubSubSubSubSubCategory(element) {
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
      subSubSubSubSubSubSubCategory(element);
    } else {
      address.add(element);
      console.log(count++ + " Items Address To List");
      element = null;
    }
  });
}
function subSubSubSubSubSubSubCategory(element) {
  var res = request(
    "GET",
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
      element.ID +
      "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false"
  );
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      subSubSubSubSubSubCategory(element);
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
