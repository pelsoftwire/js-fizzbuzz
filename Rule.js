class Rule {
    #word;
    #insertBefore;
    #wipe;
    #key;

    constructor (word, insertBefore, wipe, key) {
        this.#key = key;
        this.#word = word;
        this.#wipe = wipe;
        this.#insertBefore = insertBefore;
    }

    getKey () {
        return this.#key;
    }

    apply (output) {
        if (this.#wipe) {
            output.length = 0;
            output.push(this.#word);
        } else if (this.#insertBefore) {
            // this is duplicated code
            let i = output.findIndex( x =>  { return x[0].toLocaleLowerCase() === this.#insertBefore.toLocaleLowerCase(); });
            if (i === -1) {
                output.unshift(this.#word);
            } else {
                output.splice(i,0, this.#word);
            }
        } else {
            output.push(this.#word);
        }
    }

}

module.exports = Rule;