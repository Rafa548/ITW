// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    var InputButt = document.querySelector("#SearchVal");
    var SearchButton = document.querySelector("#searchButton")
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Circuits/Circuit?id=');
    self.displayName = 'Circuit Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.CircuitId = ko.observable('');
    self.CircuitRef = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.Location = ko.observable('');
    self.Country = ko.observable('');
    self.Lat = ko.observable('');
    self.Lng = ko.observable('');
    self.Alt = ko.observable('');
    self.Races = ko.observableArray('');
    self.Url = ko.observable('');
    self.searchall = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getCircuit...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.CircuitId(data.CircuitId);
            self.CircuitRef(data.CircuitRef);
            self.ImageUrl(data.ImageUrl);
            self.Name(data.Name);
            self.Location(data.Location);
            self.Country(data.Country);
            self.Lat(data.Lat);
            self.Lng(data.Lng);
            self.Alt(data.Alt);
            self.Races(data.Races);
            self.Url(data.Url);
            hideLoading();
            initMap();

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

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            /*disableDefaultUI: True,*/
            fullscreenControl: true,
            streetViewControl: false,
            mapId: "480a33af439808da",
            center: { lat: self.Lat(), lng: self.Lng() },
            zoom: 14
        });
    }
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
