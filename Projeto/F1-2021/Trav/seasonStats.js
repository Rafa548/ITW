// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    var InputButt = document.querySelector("#SearchVal");
    var SearchButton = document.querySelector("#searchButton")
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Statistics/Season?year=');
    self.displayName = 'Season Stats';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Year = ko.observable('');
    self.Races = ko.observable('');
    self.Countries = ko.observable('')
    self.Constructors = ko.observable('')
    self.Drivers = ko.observable('')
    self.DriverStandings = ko.observableArray('')
    self.ConstructorStandings = ko.observableArray('')
    self.searchall = ko.observable('')

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getSeasonsdet...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.Year(data.Year);
            self.Races(data.Races);
            self.Countries(data.Countries);
            self.Constructors(data.Constructors);
            self.Drivers(data.Drivers);
            self.DriverStandings(data.DriverStandings);
            self.ConstructorStandings(data.ConstructorStandings);
            hideLoading();
        });
    };
    InputButt.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            SearchButton.click();
        }
    });
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });

    }
    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    showLoading();
    var pg = getUrlParameter('year');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
