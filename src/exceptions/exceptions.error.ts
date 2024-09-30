

export class ValidationsExceptions extends Error{

    constructor(message: string) {
        super(message); 
        this.name = "ValidationsExceptions";  
      }

}