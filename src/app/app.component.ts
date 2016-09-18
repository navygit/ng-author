import { Component } from '@angular/core';

export class Publication {
	title: string;
	authors: Author[] = [];
	affiliations: Affiliation[] = [];
	constructor(title: string) {
		this.title = title;
	}
}

export class Affiliation {
	name: string;
	id: number;
	constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
	}
}

export class Author {
	sortID: number;
	name: string;
	affiliations: Affiliation[] = [];
	constructor(name: string) {
		this.name = name;
	}
}

@Component({
	selector: 'ebi-author',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent{

	title = 'Author Application!';
	affiliations: Affiliation[] = [];
	selectedAuthor: Author = new Author("");
	publication: Publication = new Publication("");

	addAuthor(): void{
		name = this.selectedAuthor.name.trim();
		if (name == ""){
			alert("Cant add empty author !!!");
		}else{
			this.selectedAuthor.sortID = this.publication.authors.length + 1;
			this.publication.authors.push(this.selectedAuthor);
			this.sort();
			this.selectedAuthor = new Author("");
			this.updateAffiliations();
		}
	};

	editAuthor(author: Author): void{
		// delete the author from the existing author list before editing the author
		this.publication.authors = this.publication.authors.filter(h => h.name !== author.name);
		this.selectedAuthor = author;
	};

	deleteAuthor(author: Author): void{
		this.publication.authors = this.publication.authors.filter(h => h.name !== author.name);
	};

	down(id: number): void{
		let tempSortID = this.publication.authors[id].sortID ;
		this.publication.authors[id].sortID = this.publication.authors[id + 1].sortID;
		this.publication.authors[id + 1].sortID = tempSortID;
		this.sort();
	};

	up(id: number): void{
		let tempSortID = this.publication.authors[id].sortID ;
		this.publication.authors[id].sortID = this.publication.authors[id - 1].sortID;
		this.publication.authors[id - 1].sortID = tempSortID;
		this.sort();
	};

	sort(): void{
		this.publication.authors.sort(function(a, b) {
			return a.sortID - b.sortID;
		});
	};

	addAffiliation(id: number): void{
		this.selectedAuthor.affiliations.push(this.affiliations.filter(h => h.id == id)[0]);
	};

	saveAffiliation(affiliation: string): void{
		this.affiliations.push(new Affiliation(affiliation, this.affiliations.length+1));
	};

	updateAffiliations(): void{
		this.publication.affiliations = [].concat.apply([], this.publication.authors.map(h => h.affiliations));
		this.publication.affiliations = this.removeDuplicates(this.publication.affiliations, "id");
	};

	removeDuplicates(myArr, prop) {
		return myArr.filter((obj, pos, arr) => {
			return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
		});
	}
}
