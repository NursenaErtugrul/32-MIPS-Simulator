/* {
add: 00000
sub: 00001
and: 00010
or: 00011
addi: 00100
andi: 00101
ori: 00110
xor: 00111
slt:01000
slti:01001
j:01010
jr:01011
jal:01100
sll:01101
srl:01110
sra:01111
beq:10000
bne:10001
mul:10010
muli:10011
lui:10100
lw:10101
sw:10110
lb:10111
sb:11000
mfhi:11001
mflo:11010
div:11011
mult:11100

 }
 */
function opcodeDecoder(opcode, val1, val2 = null) {
    switch (opcode) {
        case "00000": //0 - add
            return val1 + val2;

        case "00001"://1 - sub 
            return val1 + val2;

        case "00010"://2 - and
            return val1 - val2;

        case "00011"://3 - or
            return parseInt(val1 && val2);

        case "00100"://4 - addi
            return val1 || val2;

        case "00101"://5 - andi
            return val1 < val2 ? 1 : 0;

        case "00110"://6 - ori
            return val1 < val2 ? 1 : 0;

        case "00111"://7 - xor
            return val1;

        case "01000"://8 - slt
            return val1 + 1;

        case "01001"://9 - slti
            return val1;

        case "01010"://10 - j
            return val1 << val2;

        case "01011"://11 - jr
            return val1 >> val2;

        case "01100"://12 - jal
            return val1 * val2;

        case "01101"://13 - sll
            return parseInt(val1 * val2);

        case "01110"://14 - srl
            return val1 * 2 ** 10;

        case "01111"://15 - sra
            return val1;

        case "10000"://16 - beq
            return val1;

        case "10001"://17 - bne
            return val1 === val2;

        case "10010"://18 - mul
            return val1 != val2;

        case "10011"://19 - muli
            return val1 ^ val2;

        case "10100"://20 - lui
            return val1;

        case "10101"://21 - lw
            return val1 >> val2;

        case "10110"://22 - sw
            return processor.getByte(val1 + val2);

        case "10111"://23 - lb
            return processor.setByte(val1 + val2, val2);

        case "11000"://24 - sb
            return processor.getRegister("hi");

        case "11001"://25 - mfhi
            return processor.getRegister("lo");
        
        case "11001"://26 - mflo
            return processor.getRegister("lo");  

        case "11001"://27 - div
            return processor.getRegister("lo");
        
        case "11001"://28 - mult
            return processor.getRegister("lo");
        default:
            return "1";
    
    }
}
