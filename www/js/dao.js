"use strict";

// -------------------------------------------------- Sync ---------------------------------------------------- //
// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple local database approach.
/*
 * 
    method – the CRUD method ("create", "read", "update", or "delete")
    model – the model to be saved (or collection to be read)
    options – success and error callbacks, and all other jQuery request options
*/

Backbone.sync = function(method, model, options) {
  //Get dao 
  var dao = (typeof(model.constructor.dao) === 'undefined') ?  new model.model.dao(app.db) :  new model.constructor.dao(app.db);
  var dfd ;
  if (method === "read") {   
   if (model.get('commonName')) {
     dao.findByName(model, function(data) {
          options.success(data);
      });
    }
    else if ((model.attributes) || (model.filters)) {
      dao.findWithCriteria(model, function(data) {
          options.success(data);
      });
    }
    else {
      dao.findAll(model, function( data) {
          options.success(data);
      });
    }
  }
  else if (method === "create") {
    dfd = dao.create(model, function(data) {
      options.success(data);
    });
  }
  else if (method === "update") {
    		dfd = dao.update(model, function(data) {
      options.success(data);
    });
	}
  else if (method === "delete") {
    if (model.attributes.id) {
      dfd = dao.destroy(model.attributes.id, function(data) {
        options.success(data);
      });  
    }else{
      dfd = dao.delete(model, function(data) {
        options.success(data);
      });
    }
    
  }
  return dfd;
};

// -------------------------------------------------- DAO ---------------------------------------------------- //
// The Taxon Data Access Object (DAO). Encapsulates logic (in this case SQL statements) to access data.
app.dao.UserDAO = function(db) {
    this.db = db;
};
app.dao.ApplicationDAO= function(db) {
    this.db = db;
};
app.dao.TaxonDAO = function(db) {
    this.db = db;
};
app.dao.PictureDAO = function(db) {
    this.db = db;
};
app.dao.TaxonCaracValueDAO = function(db) {
    this.db = db;
};
app.dao.GroupeDAO = function(db) {
    this.db = db;
};
app.dao.CaracteristiqueDefDAO = function(db) {
    this.db = db;
};
app.dao.CaracteristiqueDefValueDAO = function(db) {
    this.db = db;
};
app.dao.ContextDAO = function(db) {
    this.db = db;
};
app.dao.OccurenceDataValueDAO = function(db) {
    this.db = db;
};

app.dao.ParcoursDataValueDAO = function(db) {
    this.db = db;
};

app.dao.EspeceCELDataValueDAO = function(db) {
    this.db = db;
};

_.extend(app.dao.UserDAO.prototype, app.dao.baseDAOBD,{});
_.extend(app.dao.ApplicationDAO.prototype, app.dao.baseDAOBD,{});
_.extend(app.dao.TaxonDAO.prototype, app.dao.baseDAOBD,{});
_.extend(app.dao.PictureDAO.prototype, app.dao.baseDAOBD);
_.extend(app.dao.TaxonCaracValueDAO.prototype, app.dao.baseDAOBD);
_.extend(app.dao.GroupeDAO.prototype, app.dao.baseDAOBD);
_.extend(app.dao.CaracteristiqueDefDAO.prototype, app.dao.baseDAOBD);
_.extend(app.dao.CaracteristiqueDefValueDAO.prototype, app.dao.baseDAOBD);
_.extend(app.dao.ContextDAO.prototype, app.dao.baseDAOBD);
_.extend(app.dao.OccurenceDataValueDAO.prototype, app.dao.baseDAOBD,{
  destroy: function(id,callback) {
        this.db.transaction(
            function(tx) {
                var sql = "delete from TdataObs_occurences where id= ? " ;
              tx.executeSql(sql, [id], function(tx, results) {
                callback(id,results);
              });
            },
            function(tx, error) {
                console.log(tx);
            }
        );
  }
});
_.extend(app.dao.ParcoursDataValueDAO.prototype, app.dao.baseDAOBD);


_.extend(app.dao.ParcoursDataValueDAO.prototype , {

  getDefaultRueName: function( callback) {
    var dfd = $.Deferred();
    var sql = "SELECT max(id) + 1 as nextStreet FROM TdataObs_parcours ";			
    runQuery( sql , []).done(function(d) {
      var defaultStreetName =  (!d.rows.item(0)['nextStreet']) ? 'Rue 1' : 'Rue ' +d.rows.item(0)['nextStreet'];
      return  dfd.resolve(defaultStreetName);
    });
    return  dfd.promise();     
	},

  destroy: function(id,callback) {
        this.db.transaction(
            function(tx) {
                var sql = "delete from TdataObs_parcours where id= ? " ;
              tx.executeSql(sql, [id], function(tx, results) {
                callback(id,results);
              });
            },
            function(tx, error) {
                console.log(tx);
            }
        );
    },
});

_.extend(app.dao.EspeceCELDataValueDAO.prototype, app.dao.baseDAOBD,{

});


