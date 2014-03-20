
var sauvages = window.sauvages|| {};

sauvages.notifications = (
function() {
   "use strict";
   sauvages.messages = {
           'save': 'Enregistrer',
           'begin_street': 'Début du parcours',
           'end_street':'Fin du parcours',
   },
		
   sauvages.gpsNotStart = function gpsNotStart() {
      var myModal = new NS.UI.NotificationModal({
       type: '',
       title: "Géolocalisation",
       message: "Patience, le GPS n'a pas encore démarré!",
       delay: 1,
       btnLabel: '',
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
         message: 'Retrouver vos données dans "Mes Sauvages"<br/> N\'oublier pas de les partager <br/>',
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
      message: 'Félicitations !',
      delay: 1,
      btnLabel: '', 
      onClose: function() {
         if (localisation !== null) {
            app.route.navigate('identification/'+localisation, {trigger: true});
         }else{
            app.route.navigate('identification', {trigger: true});
         }  
      },
     });
   },
   sauvages.sendToTelaWSSuccess = function email() {
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
         }
      });
   },
   sauvages.sendToTelaWSFail = function email() {
      var myModal = new NS.UI.NotificationModal({
         type: '',
         title: 'Observation envoyée',
         message: 'Une erreur s\'est produite, les observations n\'ont pu être envoyées',
         delay: 2,
         btnLabel: '',
         onClose: function() {
            $('#nodal').modal('hide');
            $('#nodal').remove();
            $('.modal-backdrop').remove();
         }
      });
   },
   sauvages.email = function email(msg) {
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
            var currentUser = new app.models.User({
               'userId': 1,
               'email':currentEmail
            });
            currentUser.save();
            $('#nodal').modal('hide');
            $('#nodal').remove();
            $('.modal-backdrop').remove();
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
   }, myModal))
   myModal.$el.on('reset', 'form', _.bind(function(evt) {
      evt.preventDefault();
      $('#nodal').modal('hide');
      $('#nodal').remove();
      $('.modal-backdrop').remove();
      app.route.navigate('taxonlist', {trigger: true});
   }, myModal))
	},
//   sauvages.SortieProtocol = function SortieProtocol(msg, route) {
//			var myModal = new NS.UI.NotificationModal({
//				type: '',
//				title: 'Rue en cours',
//				message: msg,
//				delay: '',
//				btnLabel: '', 
//			});
//   myModal.$el.on('submit', 'form', _.bind(function(evt) {
//     evt.preventDefault();
//      $('#nodal').modal('hide');
//      $('#nodal').remove();
//      $('.modal-backdrop').remove();
//      $('body').removeClass('modal-open');
//      app.route.navigate('addParcours', {trigger: true, replace: true}); 
//   }, myModal))
//   myModal.$el.on('reset', 'form', _.bind(function(evt) {
//      evt.preventDefault();
//      $('#nodal').modal('hide');
//      $('#nodal').remove();
//      $('.modal-backdrop').remove();
//      $('body').removeClass('modal-open');
//      app.globals.currentFilter.length = 0;
//						app.globals.currentFilterTaxonIdList.length = 0;
//      app.route.navigate('identification', {trigger: true, replace: trues}); 
//   }, myModal))
//   }
sauvages.SortieProtocol = function SortieProtocol() {
      var myModal = new NS.UI.NotificationModal({
         type: '',
         title: "Rue en cours",
         message: "Vous devez terminer votre rue pour accèder à cette partie de l'application",
         delay: '',
         btnLabel: 'Terminer', 
         onClose: function() {
          app.route.navigate('addParcours');
         }
      });
   }

  
  return sauvages;
})(sauvages.notifications|| {});
