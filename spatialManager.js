/*
 spatialManager.js
 A module which handles spatial lookup, as required for...
 e.g. general collision detection.
 */

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
 0			1			 2			  3			4			 5			  6			7			 8
 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 */

var spatialManager = {

// "PRIVATE" DATA

    _nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

    _entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

    getNewSpatialID : function() {
        return this._nextSpatialID++;
    },

    register: function(entity) {
        var pos = entity.getPos();
        var spatialID = entity.getSpatialID();

        this._entities[spatialID] = entity;
    },

    unregister: function(entity) {
        var spatialID = entity.getSpatialID();

        for (var i = 0; i < this._entities.length; i++) {
            var thisentity = this._entities[i];
            if (thisentity instanceof Entity) {
                if (thisentity.getSpatialID() == spatialID) {
                    this._entities.splice(i, 1);
                    break;
                }
            }
        }

    },

    findEntityInRange: function(posX, posY, radius) {
        for (var i = 0; i < this._entities.length; i++) {
            var thisentity = this._entities[i];
            if (thisentity) {
                var pos = thisentity.getPos();

                var distance = Math.sqrt(Math.pow(pos.posX - posX, 2) + Math.pow(pos.posY - posY, 2));

                if (distance <= thisentity.getRadius()) {
                    return thisentity;
                }
            }
        }

        return null;
    },

    render: function(ctx) {
        var oldStyle = ctx.strokeStyle;
        ctx.strokeStyle = "red";

        for (var ID in this._entities) {
            var e = this._entities[ID];
            if (e instanceof Entity) {
                var pos = e.getPos();
                util.strokeCircle(ctx, pos.posX, pos.posY, e.getRadius());
            }
        }
        ctx.strokeStyle = oldStyle;
    }

}/**
 * Created by N�kkvi on 31.10.2015.
 */
