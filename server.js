const express = require("express");
const bodyParser = require("body-parser");
const RxJsObservable = require("rxjs");
var app = express();
var fs = require("fs");
var ArrayList = require("arraylist");
const got = require("got");
var list = new ArrayList();
var request = require("sync-request");
app.use(bodyParser.json());
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var count=1;
app.use(bodyParser.urlencoded({ extended: true }));
function checkAndNotifyEarthquake() {
  var res = request(
    "GET",
    "https://icd.who.int/browse11/l-m/en/JsonGetRootConcepts?useHtml=false"
  );
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    subCategory(element);
  });

  console.log("\n\n\n\n\n\n\n\n Completed");
}
app.listen(process.env.PORT || 3001);
checkAndNotifyEarthquake();

function subCategory(element) {
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      if (element.averageDepth >= 3) {
        getDetails(element);
      }
      subSubCategory(element);
    } else {
      getDetails(element);
    }
  });
}

function subSubCategory(element) {
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      if (element.averageDepth >= 3) {
        getDetails(element);
      }
      subSubSubCategory(element);
    } else {
      getDetails(element);
    }
  });
}

function subSubSubCategory(element) {
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      if (element.averageDepth >= 3) {
        getDetails(element);
      }
      subSubSubSubCategory(element);
    } else {
      getDetails(element);
    }
  });
}
function subSubSubSubCategory(element) {
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      if (element.averageDepth >= 3) {
        getDetails(element);
      }
      subSubSubSubSubCategory(element);
    } else {
      getDetails(element);
    }
  });
}

function subSubSubSubSubCategory(element) {
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      if (element.averageDepth >= 3) {
        getDetails(element);
      }
      subSubSubSubSubSubCategory(element);
    } else {
      getDetails(element);
    }
  });
}

function subSubSubSubSubSubCategory(element) {
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      subSubSubSubSubSubSubCategory(element);
    } else {
      getDetails(element);
    }
  });
}
function subSubSubSubSubSubSubCategory(element) {
  var url =
    "https://icd.who.int/browse11/l-m/en/JsonGetChildrenConcepts?ConceptId=" +
    element.ID +
    "&useHtml=false&showAdoptedChildren=true&isAdoptedChild=false";
  var res = request("GET", url);
  var response = JSON.parse(res.getBody().toString());
  response.forEach((element) => {
    if (!element.isLeaf) {
      subSubSubSubSubSubCategory(element);
    } else {
      getDetails(element);
    }
  });
}

function getDetails(element) {
  var mItem = {};
  var url =
    "https://icd.who.int/browse11/l-m/en/GetConcept?ConceptId=" + element.ID;
  var res = request("GET", url);
  var response = res.getBody().toString();
  const dom = new JSDOM(response);

  var defination = Array.from(
    dom.window.document.getElementsByClassName("definition")
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
  var codingNote = Array.from(
    dom.window.document.getElementsByClassName("codingnote")
  );
  for (i = 0; i < codingNote.length; i++) {
    if (i === 0) {
      item += "<p>Coding Note</p><ul>";
    }
    item += "<li><p>" + codingNote[i].innerHTML.trim() + "</p></li>";
    if (i === codingNote.length - 1) {
      item += "</ul>";
    }
  }
  var node = Array.from(
    dom.window.document.getElementsByClassName("inclusion")
  );
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
  if(mItem.code.substr(0, element.label.indexOf("."))===""){
    mItem.DescId =  mItem.code;
  }
  list.add(mItem);
  try {
    fs.writeFileSync("response.json", JSON.stringify(list), "utf8", (err) => {
    });
    console.log(count++ +" Record Inserted");
  } catch (exce) {
    console.log(exce);
  }
}
