import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetaContent } from '../../models/meta-content.model';

@Injectable({
    providedIn: 'root'
})
export class SearchEngineOptimizationService {

    public constructor(private meta: Meta) { }

    public create(metaContent: MetaContent): void {

        this.meta.updateTag({
            name: 'description',
            content: metaContent.description
        });
        this.meta.updateTag({
            property: 'keywords',
            content: metaContent.keywords
        });
        this.meta.updateTag({
            property: 'robot',
            content: metaContent.robot
        });
        this.meta.updateTag({
            property: 'theme-color',
            content: metaContent.themeColor
        });
    }
}
