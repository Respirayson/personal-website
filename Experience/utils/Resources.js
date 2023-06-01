import * as THREE from "three";

import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Experience from "../Experience";

export default class Resources extends EventEmitter {

    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        // console.log(this.assets)

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();

    }

    setLoaders() {
        this.loaders = {}
        this.loaders.GLTFLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco");
        this.loaders.GLTFLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
        for (const asset of this.assets) {
            if (asset.type === 'glbModel') {
                this.loaders.GLTFLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                })
            }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;

        console.log("Asset loaded: " + asset.name + " (" + this.loaded + "/" + this.queue + ")");

        if (this.loaded === this.queue) {
            this.emit('ready');
        }
    }

}