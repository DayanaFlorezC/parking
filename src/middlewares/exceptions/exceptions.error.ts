

export class ValidationsExceptions extends Error {

  isCustom: boolean
    constructor(message: string) {
        super(message); 
        this.name = "ValidationsExceptions";  
      }
}


export class ValidationExceptionForbiden extends Error {
  constructor(message: string) {
    super(message); 
    this.name = "ValidationExceptionForbiden";  
  }
}

