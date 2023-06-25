// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    var InputButt = document.querySelector("#SearchVal");
    var SearchButton = document.querySelector("#searchButton")
    self.searchall = ko.observable('');
    //--- Page Events
    InputButt.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            SearchButton.click();
        }
    });
};
$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
