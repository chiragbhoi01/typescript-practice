// function adding(x: number, y: number): number {
//     return x + y;
// }

// console.log(adding(5,6));

// type chirag = {
//     name: string;
//     age: number;
// }
// type marshal =  {
//     address : string;
//     pincode : number;
// }

// type fullDetail = chirag & marshal
// const detail:fullDetail = {
//     address : "motagaon",
//     pincode : 327021,
//     name : 'chirag',
//     age : 22,
// }


// console.log(detail );

// function token (id: string | number | boolean) {
//     return console.log(id);
    
// }
// token(false)

enum Status {
    Success = 200,
    NotFound = 404,
    ServerError = 500,
    cleintError = "celemt error : 501git remote add"
}

console.log(Status.Success);   // Output: 200
console.log(Status.cleintError);  // Output: 404
