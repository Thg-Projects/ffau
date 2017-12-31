var workspace = Blockly.inject('blocklyDiv',{toolbox: document.getElementById('toolbox')}); // assign a var to the blockly workspace for future adressing
function onUpdate(event){
  var code = htmlGen.workspaceToCode(workspace);
  var iframe = document.getElementById('preview-frame');
  $('#code-output').text(code);
  iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(code);
} // function to update HTML
workspace.addChangeListener(onUpdate);
function saveCode(){
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToText(xml);
  download('code.cdr',xml_text);
}
function clearCode(){
  if(confirm("Are you sure you want to reset the Ffau workspace?")){
    Blockly.mainWorkspace.clear();
  }
}
function loadCode(){
  $('.load').show();
  $('#loadi').hide();
}
function doLoad(){
  var fileToLoad = document.getElementById('loadText').files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
    var textFromFileLoaded = fileLoadedEvent.target.result;
    var xml = Blockly.Xml.textToDom(textFromFileLoaded);
    Blockly.Xml.domToWorkspace(xml, workspace);
    $('.load').hide();
    $('#loadi').show();
  };
  fileReader.readAsText(fileToLoad, "UTF-8");
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function showMePreview(){
  document.getElementById("preview-frame").style.display = 'block';
  document.getElementById("code-output").style.display = 'none';
}
function showMeCode(){
  document.getElementById("preview-frame").style.display = 'none';
  document.getElementById("code-output").style.display = 'block';
}
$('#version-loader').load('version.txt');
$(document).ready(function(){
  $('.load').hide();
  showMePreview();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    alert('This site works better on a desktop.')
  }
});
