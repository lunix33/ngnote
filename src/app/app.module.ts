import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from '@angular/common/http'
import { MarkdownModule } from 'ngx-markdown'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { InitInjector } from './classes/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { NoteViewComponent } from './pages/note-view/note-view.component';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { CardComponent } from './components/card/card.component';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';

import { httpInterceptorProvider } from './http-interceptor';
import { SwwComponent } from './pages/sww/sww.component';

@NgModule({
	declarations: [
		AppComponent,
		
		HomeComponent,
		NoteViewComponent,
		NoteEditComponent,
		NotFoundComponent,
		SwwComponent,

		NavigationComponent,
		CardComponent,
		MarkdownEditorComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		TooltipModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		MarkdownModule.forRoot(),
		CollapseModule.forRoot(),
		BrowserAnimationsModule,
		TabsModule.forRoot()
	],
	providers: [ httpInterceptorProvider ],
	bootstrap: [ AppComponent ]
})
export class AppModule {
	constructor(injector: Injector) {
		InitInjector(injector)
	}
}
