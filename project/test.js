function test(){
    let num = 0;
    for(let i = 0; i < 100000000; i++){
        num += i;
        if(i == 99999999){
            console.log(num);
        }
    }
    return 0;
}
console.log(test());