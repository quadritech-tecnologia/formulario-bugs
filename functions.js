$(document).ready(function () {
  var parametros = location.search.split("?")[1];
  if (parametros != "" && typeof parametros != "undefined") {
    reproducibility = parametros.split("&")[0];
    severity = parametros.split("&")[1];
    impact = parametros.split("&")[2];
    group = parametros.split("&")[3];
    criticity = parametros.split("&")[4];
    description = parametros.split("&")[5];

    value_repro = reproducibility.split("=")[1];
    value_severity = severity.split("=")[1];
    value_impact = impact.split("=")[1];
    value_group = group.split("=")[1];
    value_criticity = criticity.split("=")[1];
    value_description = description.split("=")[1];

    $("#reproducibility").val(value_repro);
    $("#severity").val(value_severity);
    $("#impact").val(value_impact);
    $("#group").val(value_group);
    $("#description").val(value_description);

    var cor = "#545454";
    var cor_fonte = "#000";
    var nivel = value_criticity;
    if (nivel == "Trivial") {
      cor = "#94ff7a";
    } else if (nivel == "Minor") {
      cor = "#fffa00";
    } else if (nivel == "Major") {
      cor = "#ff9900";
    } else if (nivel == "Critical") {
      cor = "#ff0000";
      cor_fonte = "#FFF";
    } else if (nivel == "Blocker") {
      cor = "#000";
      cor_fonte = "#FFF";
    }

    $("#criticity").css("background", cor);
    $("#criticity").css("color", cor_fonte);
    $("#criticity").val(nivel);
  }
});

function calcularFmea() {
  if ($("#reproducibility").val() == 0 && $("#reproducibility").val() != "") {
    var reproducibility = 1;
    $("#reproducibility").val(1);
  } else {
    var reproducibility = $("#reproducibility").val();
  }

  if ($("#severity").val() == 0 && $("#severity").val() != "") {
    var severity = 1;
    $("#severity").val(1);
  } else {
    var severity = $("#severity").val();
  }

  if ($("#impact").val() == 0 && $("#impact").val() != "") {
    var impact = 1;
    $("#impact").val(1);
  } else {
    var impact = $("#impact").val();
  }

  if ($("#group").val() == 0 && $("#group").val() != "") {
    var group = 1;
    $("#group").val(1);
  } else {
    var group = $("#group").val();
  }

  if ($("#description").val() == "") {
    $("#description").val("Descrição do problema");
  } else {
    var description = $("#description").val();
  }

  if (reproducibility != "" && severity != "" && impact != "" && group != "") {
    var criticity = ((reproducibility * 3 + severity * 4 + impact * 6 + group * 3 - 16) / 70) * 100;

    if (criticity > 100) criticity = 100;
    if (criticity < 0) criticity = 0;

    var nivel = "";
    var cor = "#545454";
    var cor_fonte = "#000";
    if (criticity >= 0 && criticity < 20) {
      cor = "#94ff7a";
      nivel = "Trivial";
    } else if (criticity >= 20 && criticity < 40) {
      cor = "#fffa00";
      nivel = "Minor";
    } else if (criticity >= 40 && criticity < 60) {
      cor = "#ff9900";
      nivel = "Major";
    } else if (criticity >= 60 && criticity < 80) {
      cor = "#ff0000";
      cor_fonte = "#FFF";
      nivel = "Critical";
    } else if (criticity > 80) {
      cor = "#000";
      cor_fonte = "#FFF";
      nivel = "Blocker";
    }
    criticity = Math.round(criticity);
    $("#criticity").css("background", cor);
    $("#criticity").css("color", cor_fonte);
    $("#criticity").val(nivel);
    $("#description").val(description);

    gerarUrl();
  }
}

function gerarUrl() {
  var url = "index.html";
  var reproducibility = $("#reproducibility").val();
  var severity = $("#severity").val();
  var impact = $("#impact").val();
  var group = $("#group").val();
  var criticity = $("#criticity").val();
  var description = $("#description").val();
  console.log(description);

  url =
    url +
    "?reproducibility=" +
    reproducibility +
    "&severity=" +
    severity +
    "&impact=" +
    impact +
    "&group=" +
    group +
    "&criticity=" +
    criticity;
  +"&description=" + description;

  window.location.href = url;
}

function validadeDado(obj, valor) {
  //acept only numbers
  $("#" + obj.id).val(valor.replace(/\D/g, ""));

  if (obj.id == "reproducibility") {
    if (valor >= 5) {
      $("#" + obj.id).val(5);
    } else if (valor < 0) {
      $("#" + obj.id).val(1);
    }
  }
  if (obj.id == "severity") {
    if (valor >= 5) {
      $("#" + obj.id).val(5);
    } else if (valor < 0) {
      $("#" + obj.id).val(1);
    }
  }
  if (obj.id == "impact") {
    if (valor >= 6) {
      $("#" + obj.id).val(6);
    } else if (valor < 0) {
      $("#" + obj.id).val(1);
    }
  }
  if (obj.id == "group") {
    if (valor >= 5) {
      $("#" + obj.id).val(5);
    } else if (valor < 0) {
      $("#" + obj.id).val(1);
    }
  }
}
