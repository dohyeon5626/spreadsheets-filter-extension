export abstract class BaseTag {

    protected content: HTMLElement;

    constructor(html: string) {
        this.content = this.createTag(html);
    }

    private createTag(html: string): HTMLElement {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.firstElementChild as HTMLElement;
    }

}

export class SpreadSearchBar extends BaseTag {

    constructor() {
        super(`<input id='spreadSearchBar' class='spread-search-bar' type=text/>`);
    }

    public static isExist(): boolean {
        return document.getElementById("spreadSearchBar") != null;
    }

    public putSearchBar() {
        const searchBar = this.content as HTMLInputElement;
        const target = document.getElementById('waffle-disclaimer-bar')?.nextSibling?.firstChild!! as HTMLElement
        target?.append(searchBar);
        
        searchBar.addEventListener("keydown", (event) => { if (event.key == "Enter") event.preventDefault(); });

        searchBar.addEventListener("keyup", () => {
            const searchValue = searchBar.value.trim();
            const testElements = document.getElementsByClassName("docs-sheet-tab-name");

            Array.from(testElements).forEach((element) => {
                const parent = (element as HTMLElement).offsetParent;
                if (parent) {
                    const matches = searchValue === "" || element.innerHTML.includes(searchValue);
                    parent.classList.toggle("search-disabled", !matches);
                }
            });
        });
    }
}