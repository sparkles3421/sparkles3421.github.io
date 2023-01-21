// Variables
const HasDebug = false; //shows what js is doing in console.
const CopyTime = 5000; //how long to show "copied" in ms set 0 for no message
const refrashRa = 500; //Refresh rate on grab (500 recomended do not go under 100 or it'll start lagging for some users.)
const refreshGen = 100; //Refresh on get JSON (100 recomended)
const loopingUpdate = 2; //refreshes all json every {loopingUpdate} refresh(s) number recommened from 1-5 no doubles
/*
I recommend you dont edit the below unless you know what
you are doing.
The code below just gets data and insets it
*/
if (HasDebug) {
  console.log("Loading");
}
var dataloop = 1;
var p;
var list;
var il = false;
var getJSON = function (url, callback) {
  if (HasDebug) {
    console.log("Loading JSON: " + url);
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
      if (HasDebug) {
        console.log("status success");
      }
    } else {
      callback(status, xhr.response);
      if (HasDebug) {
        console.log("status break");
      }
    }
  };
  xhr.send();
};
p = 0;
function LO() {
  if (HasDebug) {
    console.log("Body Loaded");
  }
  il = true;
}
function start() {
  setTimeout(function () {
    if (il) {
      if (list) {
        if (HasDebug) {
          console.log("Loading text");
        }
        if (list.scr) {
          if (p < list.scrAmt) {
            var strin = "";
            for (var cur = 0; cur < list.scr.length; cur++) {
              strin = strin + list.scr[cur];
            }
            var scrip = document.createElement("script");
            scrip.innerHTML = strin;
            document.head.appendChild(scrip);
            p = p + 1;
          }
          if (list.scrAmt == -1) {
            var strin = "";
            for (var cur = 0; cur < list.scr.length; cur++) {
              strin = strin + list.scr[cur];
            }
            var scrip = document.createElement("script");
            scrip.innerHTML = strin;
            document.head.appendChild(scrip);
          }
        }
        document.getElementById("IP").innerHTML = "Latest IP: " + list.IP;
        document.getElementById("WEB").innerHTML = "Website: " + list.we;
        if (dataloop > loopingUpdate) {
          dataloop = 1;
          getJSON(
            "https://discord.com/api/guilds/1038493335679156425/widget.json",
            function (err, data) {
              if (err == null) {
                if (data !== null) {
                  var data_num;
                  for (var i = 0; i < data.members.length; i++) {
                    if (data.members[i] !== undefined) {
                      if (data.members[i].username == "Minecraft Chat Link") {
                        data_num = i;
                      }
                    }
                  }
                  if (data_num) {
                    document.getElementById("Status").innerHTML = "🟢Online";
                    document.getElementById("Players").innerHTML =
                      data.members[data_num].game.name.substring(12);
                  } else {
                    document.getElementById("Status").innerHTML = "🔴Offline";
                  }
                }
              }
            }
          );
        } else {
          dataloop = dataloop+1
        }
        if (HasDebug) {
          console.log("Set text");
        }
      } else {
        if (HasDebug) {
          console.log("JSON fail");
        }
        gen();
      }
    } else {
      if (HasDebug) {
        console.log("Body Fail");
      }
    }
    start();
  }, refrashRa);
}
function gen() {
  if (HasDebug) {
    console.log("Grabing JSON");
  }
  getJSON(
    "https://raw.githubusercontent.com/sparkles3421/stellarica-website/main/main.json",
    function (err, data) {
      if (err == null) {
        if (HasDebug) {
          console.log("Got JSON");
        }
        list = data;
        start();
      } else {
        if (HasDebug) {
          console.log("Errored, trying again.");
        }
        setTimeout(function () {
          gen();
        }, refreshGen);
      }
    }
  );
}
gen();
function cIP() {
  if (list) {
    if (list.IP) {
      if (HasDebug) {
        console.log("Creating  Copy Element");
      }
      const type = "text/plain";
      const blob = new Blob([list.IP], { type });
      const cpp = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(cpp);
      if (HasDebug) {
        console.log("Copyied Blob");
      }
      if (HasDebug) {
        console.log("Displaying copy");
      }
      document.getElementById("IC").innerHTML = "copied";
      setTimeout(function () {
        document.getElementById("IC").innerHTML = "";
        if (HasDebug) {
          console.log("Cleared Copy message");
        }
      }, CopyTime);
    }
  }
}
function cWEB() {
  if (list) {
    if (list.IP) {
      if (HasDebug) {
        console.log("Creating Copy Element");
      }
      const type = "text/plain";
      const blob = new Blob([list.we], { type });
      const cpp = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(cpp);
      if (HasDebug) {
        console.log("Copyied Blob");
      }
      if (HasDebug) {
        console.log("Displaying copy");
      }
      document.getElementById("CW").innerHTML = "copied";
      setTimeout(function () {
        document.getElementById("CW").innerHTML = "";
        if (HasDebug) {
          console.log("Cleared Copy message");
        }
      }, CopyTime);
    }
  }
}
