module.exports = function(source){

let stack = [];
function str_to_bin(text,char){
    //------------------.과♡만 거르기---------------------//
    let str = text.value.substring(char,text.length);
    let tmp = str.split('').map(value => {
        return value == '.' ? 0 : 1;
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
    strs.forEach((str)=>{
        let start_char_tmp = [str.value.indexOf('.'),str.value.indexOf('♡')];
        let start_char = start_char_tmp[1];
        if(start_char_tmp[0] < start_char_tmp[1]) {
            start_char = start_char_tmp[0]
        }
        if(start_char_tmp[1] == -1){
            start_char = start_char_tmp[0];
        }else if(start_char_tmp[0] == -1){
            start_char = start_char_tmp[1];
        }
        str.value = [str.value.substring(0,start_char),str_to_bin(str,start_char)];
    });
    return strs;
}

function execute(code){
    let operators = lexer(code);
    operators.forEach((operator)=>{
        switch(operator.value[0]){
            case "치노쨩":
                let tmp = Number(operator.value[1]);
                let ansi = parseInt(tmp,2);
                stack.push(String.fromCharCode(ansi));

                break;
            default:
                console.log("NOTHING");
        }
    });
    return stack.join('');
}
	return execute(source);
};