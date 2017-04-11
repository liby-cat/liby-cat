'use strict';

module.exports = function(Org) {
  Org.validatesUniquenessOf('orgIdx');

  Org.disableRemoteMethodByName('prototype.__create__admins', false);
  Org.disableRemoteMethodByName('prototype.__delete__admins', false);
  Org.disableRemoteMethodByName('prototype.__findById__admins', false);//GET /Org/{id}/admins/{fk}
  Org.disableRemoteMethodByName('prototype.__updateById__admins', false);
  Org.disableRemoteMethodByName('prototype.__destroyById__admins', false);
};
