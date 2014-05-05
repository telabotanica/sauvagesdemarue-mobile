
var sauvages = window.sauvages|| {};

sauvages.notifications = (
function() {
   "use strict";
   sauvages.messages = {
           'save': 'Enregistrer',
           'begin_street': 'Début du parcours',
           'end_street':'Fin du parcours',
   },
		
   sauvages.gpsNotStart = function gpsNotStart(msg) {
      var myModal = new NS.UI.NotificationModal({
       type: '',
       title: "Géolocalisation",
       message: msg,
       delay: 4,
       btnLabel: '',
      onClose: function() {
          $('#nodal').modal('hide');
          $('#nodal').remove();
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
       }
      });
   },
   
   sauvages.supprimerObs = function supprimerObs(msg) {
      var myModal = new NS.UI.NotificationModal({
       type: '',
       title: 'Supprimer une observation',
       message: msg,
       delay: 3,
       btnLabel: '',
      });
   },
	
   sauvages.finParcours = function finParcours() {
      var myModal = new NS.UI.NotificationModal({
         type: '',
         title: 'Rue sauvegardée',
         message: 'Retrouver vos données dans la rubrique "Mes Sauvages"<br/> N\'oublier pas de les partager <br/>',
         delay: 2,
         btnLabel: '',
         onClick: function() {
          app.route.navigate('addParcours/new', {trigger: true});
         },
      });
   },
	
   sauvages.obsSaveSuccess = function obsSaveSuccess(localisation) {
     var myModal = new NS.UI.NotificationModal({
      type: '',
      title: 'Observation sauvegardée',
      message: 'Félicitations !<br/>Retrouver vos données dans la rubrique "Mes Sauvages"',
      delay: 2,
      btnLabel: '', 
      onClose: function() {
         if (localisation) {
            app.route.navigate('identification/' + localisation, {trigger: true});
         }else{
            app.route.navigate('identification', {trigger: true});
         }  
      },
     });
   },

   sauvages.emailSaveSuccess= function emailSaveSuccess() {
     var myModal = new NS.UI.NotificationModal({
      type: '',
      title: 'Votre email a été sauvegardé',
      message: 'Félicitations !',
      delay: 2,
      btnLabel: '',
      onClose: function() {
          $('#nodal').modal('hide');
          $('#nodal').remove();
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
       }
     });
   },

   sauvages.sendToTelaWSSuccess = function sendToTelaWSSuccess() {
      var myModal = new NS.UI.NotificationModal({
         type: '',
         title: 'Observation envoyée',
         message: 'L\'envoi des observations s\'est bien déroulé.',
         delay: 1,
         btnLabel: '',
         onClose: function() {
            $('#nodal').modal('hide');
            $('#nodal').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
         }
      });
   },
   sauvages.sendToTelaWSFail = function sendToTelaWSFail() {
      var myModal = new NS.UI.NotificationModal({
         type: '',
         title: 'Observation envoyée',
         message: 'Une erreur s\'est produite, les observations n\'ont pu être envoyées',
         delay: 3,
         btnLabel: '',
         onClose: function() {
            $('#nodal').modal('hide');
            $('#nodal').remove();
            $('.modal-backdrop').remove();
         }
      });
   },
   sauvages.email = function email(msg,currentUser) {
      var myModal = new NS.UI.NotificationModal({
         type: '',
         title: 'Ajouter votre email.',
         message: msg,
         delay: '',
         btnLabel: 'Annuler'
      });
      myModal.$el.on('submit', _.bind(function(evt) {
         evt.preventDefault();
           var currentEmail = this.$el.find('input[type="email"]').val();
            currentUser.set('email',String(currentEmail))
            .save();
            $('#nodal').modal('hide');
            $('#nodal').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
      }, myModal))
   },
   sauvages.helpKey = function helpKey(criteriaName,criteriaValues) {
      var myModal = new NS.UI.NotificationModal({
         type: 'helpkey',
         title: criteriaName,
         message: criteriaValues,
         delay: '',
         btnLabel: '', 
         onClose: function() {
          app.route.navigate('taxonlist', {trigger: true});
          }
      });
   },

   sauvages.connection= function connection(connect) {
      var myModal = new NS.UI.NotificationModal({
         type: '',
         title: 'Connection à internet',
         message: "Votre connexion est de type : <em>"+connect+"</em><br/> L'envoi des observations requiert une connexion à haut débit (3G, H+, 4G, wifi)." ,
         delay: '',
         btnLabel: '',
         onClose: function() {
            $('#nodal').modal('hide');
            $('#nodal').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
         }
      });
   },
   sauvages.connectionInfo = function connectionInfo(msg,idRue,viewBefore) {
      var self = this;
      self.viewBefore = viewBefore ;
      var myModal = new NS.UI.NotificationModal({
       type: '',
       title: 'Êtes-vous vous connecté à un réseau à haut débit ?',
       message:  msg,
       delay: '',
       btnLabel: '',
         onClose: function() {
            $('#nodal').modal('hide');
            $('#nodal').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            $(self.viewBefore).find("#"+idRue).removeClass('test-obs').addClass('send-obs').trigger('click');
            $(self.viewBefore).find("#"+idRue).removeClass('send-obs').addClass('test-obs');
         }
      });
    },

   sauvages.finDeProtocol = function finDeProtocol(msg) {
      var myModal = new NS.UI.NotificationModal({
       type: '',
       title: 'Voulez-vous terminer votre parcours ?',
       message:  msg,
       delay: '',
       btnLabel: '', 
      });
      myModal.$el.on('submit', 'form', _.bind(function(evt) {
         evt.preventDefault();
         $('#nodal').modal('hide');
         $('#nodal').remove();
         $('.modal-backdrop').remove();
         $('body').removeClass('modal-open');
      }, myModal))
      myModal.$el.on('reset', 'form', _.bind(function(evt) {
         evt.preventDefault();
         $('#nodal').modal('hide');
         $('#nodal').remove();
         $('.modal-backdrop').remove();
         $('body').removeClass('modal-open');
         app.route.navigate('taxonlist', {trigger: true});
      }, myModal))
    },
   sauvages.SortieProtocol = function SortieProtocol(msg) {
      var myModal = new NS.UI.NotificationModal({
       type: '',
       title: 'Rue en cours',
       message: msg,
       delay: '',
       btnLabel: '', 
      });
      myModal.$el.on('submit', 'form', _.bind(function(evt) {
        evt.preventDefault();
         $('#nodal').modal('hide');
         $('#nodal').remove();
         $('.modal-backdrop').remove();
         $('body').removeClass('modal-open');
         app.route.navigate('addParcours', {trigger: true, replace: true});
         $("#menu").trigger("close");
      }, myModal))
      myModal.$el.on('reset', 'form', _.bind(function(evt) {
         evt.preventDefault();
         $('#nodal').modal('hide');
         $('#nodal').remove();
         $('.modal-backdrop').remove();
         $('body').removeClass('modal-open');
         //app.globals.currentFilter.length = 0;
         //app.globals.currentFilterTaxonIdList.length = 0;
         //app.route.navigate('identification', {trigger: true, replace: trues});
         $("#menu").trigger("close"); 
      }, myModal))
   }  
  return sauvages;
})(sauvages.notifications|| {});
