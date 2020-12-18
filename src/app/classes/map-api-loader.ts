import { Injectable, Inject, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral, GoogleMapsScriptProtocol } from '@agm/core';
import { Events } from './enum/events.enum';
import { OptionsService } from '../services/options.service';
import { EventsService } from '../services/events.service';

@Injectable()
export class CustomLazyAPIKeyLoader extends MapsAPILoader {
    private _scriptLoadingPromise: Promise<void>;
    private _config: LazyMapsAPILoaderConfigLiteral;

    constructor( @Inject(LAZY_MAPS_API_CONFIG) config: any, private http: HttpClient, private optionService : OptionsService, private eventService : EventsService) {
        super();
        this._config = config || {};
    }

    load(): Promise<void> {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }



        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName: string = `angular2GoogleMapsLazyMapsAPILoader`;

        console.warn('options:',this.optionService.options)

        if (this.optionService.options.apiKey) {
          this._config.apiKey = this.optionService.options.apiKey;
                script.src = this._getScriptSrc(callbackName);
                document.body.appendChild(script);
        } else {
          this.eventService.sub(Events.OPTIONSLOADED, () => {
            this._config.apiKey = this.optionService.options.apiKey;
                  script.src = this._getScriptSrc(callbackName);
                  document.body.appendChild(script);
          })
        }



        this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            (<any>window)[callbackName] = () => { this.eventService.pub(Events.MAPSLOADED); resolve(); };

            script.onerror = (error: Event) => { reject(error); };
        });


        return this._scriptLoadingPromise;
    }

    private _getScriptSrc(callbackName: string): string {
        let protocolType: GoogleMapsScriptProtocol =
            (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        let protocol: string;

        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }

        const hostAndPath: string = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        const queryParams: { [key: string]: string | Array<string> } = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: ["places","marker"],
            region: this._config.region,
            language: this._config.language
        };
        const params: string =
            Object.keys(queryParams)
                .filter((k: string) => queryParams[k] != null)
                .filter((k: string) => {
                    // remove empty arrays
                    return !Array.isArray(queryParams[k]) ||
                        (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
                })
                .map((k: string) => {
                    // join arrays as comma seperated strings
                    let i = queryParams[k];
                    if (Array.isArray(i)) {
                        return { key: k, value: i.join(',') };
                    }
                    return { key: k, value: queryParams[k] };
                })
                .map((entry: { key: string, value: string }) => { return `${entry.key}=${entry.value}`; })
                .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
