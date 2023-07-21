var local = {};
local.exe = (lines, tags, pc, processor) => {
    if (lines == null) {
        pc = 0;
        return pc;
    }
    let line = lines[pc];
    if (line[0].includes(":") && line.length != 1) {
        line.splice(0, 1);
    }
    if (line[0] == "" || line[0] == "#") {
        pc = pc + 1;
    } else if (line[0].includes(":") && line.length === 1) {
        pc = pc + 1;
    } else if (line[0] === "add") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00000";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "mul") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "10010";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "muli") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "10011";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "and") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00010";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "slt") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "01000";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "slti") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "01001";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        processor.setRegister(dest, val1 < val2 ? 1 : 0);
        console.log(val1 && val2);
        pc = pc + 1;
    } else if (line[0] === "andi") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "00101";
        processor.setRegister(dest, parseInt(val1 && val2));
        pc = pc + 1;
    } else if (line[0] === "or") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00011";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "ori") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "00110";
        processor.setRegister(dest, val1 || val2);
        pc = pc + 1;
    } else if (line[0] === "sub") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00001";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "srl") {
        let dest = line[1].replace("$", "");
        let src1 = line[3].replace("$", "");
        let src = line[2].replace("$", "");
        let val = processor.getRegister(src);
        let val1 = processor.getRegister(src1);
        let result = val >>> val1; // Sol kaydırma işlemi
        processor.setRegister(dest, result);
        pc = pc + 1;
        opcode = "01110";
    } else if (line[0] === "sll") {
        let dest = line[1].replace("$", "");
        let src1 = line[3].replace("$", "");
        let src = line[2].replace("$", "");
        let val = processor.getRegister(src);
        let val1 = processor.getRegister(src1);
        let result = val << val1; // Sol kaydırma işlemi
        processor.setRegister(dest, result);
        pc = pc + 1;
        opcode = "01101";
    } else if (line[0] === "bne") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "10001";
        if (opcodeDecoder(opcode, val1, val2)) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
    }
     else if (line[0] === "beq") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "10000";
        if (opcodeDecoder(opcode, val1, val2)) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
    } 
    else if (line[0] === "j") {
        let dest = tags.get(line[1] + ":");
        opcode = "01010";
        pc = opcodeDecoder(opcode, dest);
    } else if (line[0] === "addi" || line[0]==="addiu") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "00100";
        console.log(val1 + val2);
        processor.setRegister(dest, val1 + val2);
        pc = pc + 1;
    }
    else if (line[0] === "lui") {
        let src1 = parseInt(line[2]);
        let dest = line[1].replace("$", "");
        opcode = "10100";
        processor.setRegister(dest, opcodeDecoder(opcode, src1));
        pc = pc + 1;
    } else if (line[0] === "lw") {
        let src = line[2].split("(");
        let offset = parseInt(src[0]);
        let src1 = src[1].replace("$", "").replace(")", "");
        let src2 = offset + processor.getRegister(src1);
        let dest = line[1].replace("$", "");
        let value = processor.getMemory(src2);
        opcode = "10101";
        processor.setRegister(dest, value);
        pc = pc + 1;
    } else if (line[0] === "sw") {
        let dest = line[2].split("(");
        let offset = parseInt(dest[0]);
        let dest1 = dest[1].replace("$", "").replace(")", "");
        let dest2 = offset + processor.getRegister(dest1);
        let src = line[1].replace("$", "");
        let value = processor.getRegister(src);
        opcode = "10110";
        processor.setMemory(dest2, opcodeDecoder(opcode, value));
        pc = pc + 1;
    }else if (line[0] === "xor") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00111";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "jal") {
        let addr = parseInt(line[1]);
        let returnAddress = pc + 1;
        processor.setRegister("$ra", returnAddress);
        opcode = "01100";
        pc = addr;
        valid = true;
    }else if (line[0] === "sra") {
        let dest = line[1].replace("$", "");
        let src1 = line[3].replace("$", "");
        let src = line[2].replace("$", "");
        let val = processor.getRegister(src);
        let val1 = processor.getRegister(src1);
        let result = val >> val1; // Sağa kaydırma işlemi
        processor.setRegister(dest, result);
        opcode = "01111";
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "lb") {
        let offset = parseInt(line[2]);
        let base = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(base);
        opcode = "10111";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, offset));
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "sb") {
        let offset = parseInt(line[2]);
        let base = line[3].replace("$", "");
        let src = line[1].replace("$", "");
        let val1 = processor.getRegister(base);
        let val2 = processor.getRegister(src);
        opcode = "11000";
        processor.setRegister(src, opcodeDecode(opcode, val1, val2 ));
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "mfhi") {
        let dest = line[1].replace("$", "");
        let val = processor.getRegister("$hi");
        processor.setRegister(dest, opcodeDecoder(opcode, val));
        opcode = "11001";
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "mflo") {
        let dest = line[1].replace("$", "");
        let val = processor.getRegister("$lo");
        processor.setRegister(dest, opcodeDecoder(opcode, val));
        opcode = "11010";
        pc = pc + 1;
        valid = true;
    }else if (line[0] === "div") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, opcodeDecode(opcode, val1, val2));
        opcode = "11011";
        pc = pc + 1;
        valid = true;
    }
    else if (line[0] === "mult" || line[0] === "multu") {
        let src1 = line[2].replace("$", ""); // get the first source register
        let src2 = line[3].replace("$", ""); // get the second source register
        let val1 = processor.getRegister(src1); // get the value of the first source register
        let val2 = processor.getRegister(src2); // get the value of the second source register
        let result = val1 * val2; // multiply the values
        processor.setRegister("lo", result & 0xFFFFFFFF); // store the lower 32 bits of the result in lo register
        processor.setRegister("hi", (result >>> 32) & 0xFFFFFFFF); // store the higher 32 bits of the result in hi register
        opcode="11100";
        pc = pc + 1; // increment the program counter
        valid = true; // set the valid flag to true
    } else if (line[0] === "syscall") {
        let code = processor.getRegister("v0");
        switch (code) {
            case 1:
                const text = processor.getRegister("a0");
                pc = pc + 1;
                break;
            case 4:
                pc = pc + 1;
                break;
            case 10:
                pc = 0;
                break;
            default:
                pc = pc + 1;
        }
    } else if (line[0] === "jr") {
        opcode = "01011";
        pc = opcodeDecoder(opcode, pc);
    } else {
        pc = pc + 1;
    }
    if (pc === lines.length) {
        pc = 0;
    }
    return pc;
};

export default local;
