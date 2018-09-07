let mutationrate = 0.5;

class DNA {

    constructor(gene = []) {
        this.gene = gene;
    }

    mutation() {

        for (let i = 0; i < this.gene.length; i++) {
            if (random() < mutationrate) {
                this.gene[i] += random(-1, 1);
            }
        }

    }

    crossOver(otherDna) {
        let newgene = [];

        let crosspoint = floor(random(this.gene.length));

        if (random() < 0.5) {
            for (let i = 0; i < crosspoint; i++) {
                newgene[i] = otherDna.gene[i];
            }
            for (let i = crosspoint; i < this.gene.length; i++) {
                newgene[i] = this.gene[i];
            }
        } else {
            for (let i = 0; i < crosspoint; i++) {
                newgene[i] = this.gene[i];
            }
            for (let i = crosspoint; i < this.gene.length; i++) {
                newgene[i] = otherDna.gene[i];
            }
        }

        return new DNA(newgene);
    }


}