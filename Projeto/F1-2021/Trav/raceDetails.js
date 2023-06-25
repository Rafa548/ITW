// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    var InputButt = document.querySelector("#SearchVal");
    var SearchButton = document.querySelector("#searchButton")
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Races/Race?id=');
    self.displayName = 'Race Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.RaceId = ko.observable('');
    self.Circuit = ko.observable('');
    self.Year = ko.observable('');
    self.Round = ko.observable('');
    self.Name = ko.observable('');
    self.Date = ko.observable('');
    self.Time = ko.observableArray('');
    self.Url = ko.observable('');
    self.Results = ko.observable('');
    self.search = ko.observable('');
    self.searchall = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getRace...');
        var composeUri = self.baseUri() + id;
        ajaxHelper(composeUri, 'GET').done(function (data) {
            console.log(data);  
            self.RaceId(data.RaceId);
            self.Circuit(data.Circuit);
            self.Year(data.Year);
            self.Name(data.Name);
            self.Round(data.Round);
            self.Date((data.Date).split("T")[0]);
            self.Time(data.Time);
            self.Url(data.Url);
            self.Results(data.Results);
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

    function WithoutTime(dateTime) {
            var Date = new Date(dateTime.getTime());
            date.setHours(0, 0, 0, 0);
            return Date;
        }
        
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
        var sPageUR = window.location.search.substring(1),
            sURLVariables = sPageUR.split('&'),
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
    var pg = getUrlParameter('id');
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
