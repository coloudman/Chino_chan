let stack = [];
function str_to_bin(text,char){
    //------------------.과♡만 거르기---------------------//
    let str = text.value.substring(char,text.length);
    let tmp = str.split('');
    tmp.forEach((value,index)=>{
        if(value == '.'){
            tmp[index] = 0;
        }else{
            tmp[index] = 1;
        }
    });

    tmp = tmp.join('');
    return tmp;
}

function lexer(code){
    let strs = code.split(/\s+/)
    .filter(t=>{ return t.length > 0})
    .map(t=>{
        return {type: 'word', value: t}
    });
    strs.forEach((value,index)=>{
        let start_char_tmp = [strs[index].value.indexOf('.'),strs[index].value.indexOf('♡')];
        let start_char = start_char_tmp[1];
        if(start_char_tmp[0] < start_char_tmp[1]) {
            start_char = start_char_tmp[0]
        }
        if(start_char_tmp[1] == -1){
            start_char = start_char_tmp[0];
        }else if(start_char_tmp[0] == -1){
            start_char = start_char_tmp[1];
        }
        strs[index].value = [strs[index].value.substring(0,start_char),str_to_bin(strs[index],start_char)];
    });
    return strs;
}

function execute(code){
    let operators = lexer(code);
    operators.forEach((value,index)=>{
        switch(operators[index].value[0]){
            case "치노쨩":
                let tmp = Number(operators[index].value[1]);
                let ansi = parseInt(tmp,2);
                stack.push(String.fromCharCode(ansi));

                break;
            default:
                console.log("NOTHING");
        }
    });
    return stack.join('');
}

let op = "치노쨩♡..♡... 치노쨩♡♡..♡.♡ 치노쨩♡♡.♡♡.. 치노쨩♡♡.♡♡.. 치노쨩♡♡.♡♡♡♡ 치노쨩♡.♡♡.. 치노쨩♡♡♡.♡♡♡ 치노쨩♡♡.♡♡♡♡ 치노쨩♡♡♡..♡. 치노쨩♡♡.♡♡.. 치노쨩♡♡..♡..";

//console.log(lexer(op));
console.log(execute(op));