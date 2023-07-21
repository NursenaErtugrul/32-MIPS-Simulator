import processor from "./processor";
var execute = {};
execute.exe = (lines, tags, pc, print) => {
    let valid = false;
    let currentPC = pc;
    if (lines == null) {
        pc = 0;
        return pc;
    }
    let line = lines[pc];
    if (line[0].includes(":") && line.length != 1) {
        line.splice(0, 1);
    }
    if (line[0] == "" || line[0] == "#" || line[0].includes(".")) {
        pc = pc + 1;
        valid = true;
    } else if (line[0].includes(":") && line.length === 1) {
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "add") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 + val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "sub" ) {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 - val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "addi" || line[0]==="addiu") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 + val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "mul") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 * val2);
        pc = pc + 1;
        valid = true;
    } 
    else if (line[0] === "muli") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, parseInt(val1 * val2));
        pc = pc + 1;
        valid = true;
    }
     else if (line[0] === "and") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 & val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "andi") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, parseInt(val1 & val2));
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "slt") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 < val2 ? 1 : 0);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "slti") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 < val2 ? 1 : 0);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "or") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 | val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "ori") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 | val2);
        pc = pc + 1;
        valid = true;
    } 
    else if (line[0] === "srl") {
        let dest = line[1].replace("$", "");
        let src1 = line[3].replace("$", "");
        let src = line[2].replace("$", "");
        let val = processor.getRegister(src);
        let val1 = processor.getRegister(src1);
        let result = val >>> val1; // Sol kaydırma işlemi
        processor.setRegister(dest, result);
        pc = pc + 1;
        valid = true;
    }
    
    else if (line[0] === "sll") {
        let dest = line[1].replace("$", "");
        let src1 = line[3].replace("$", "");
        let src = line[2].replace("$", "");
        let val = processor.getRegister(src);
        let val1 = processor.getRegister(src1);
        let result = val << val1; // Sol kaydırma işlemi
        processor.setRegister(dest, result);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "bne") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        if (val1 != val2) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
        valid = true;
    } else if (line[0] === "beq") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        if (val1 === val2) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
        valid = true;
    } 
    else if (line[0] === "j") {
        let dest = tags.get(line[1] + ":");
        pc = dest;
        valid = true;
    }
    else if (line[0] === "lui") {
        let src1 = parseInt(line[2]); // get the immediate value
        let dest = line[1].replace("$", ""); // get the destination register
        let val1 = src1 << 16; // shift the immediate value left by 16 bits
        processor.setRegister(dest, val1); // store the value in the destination register
        pc = pc + 1; // increment the program counter
        valid = true; // set the valid flag to true
      }    
    else if (line[0] === "lw") {
        let src = line[2].split("(")
        let offset = parseInt(src[0])
        let src1 = src[1].replace("$", "").replace(")", "")
        let src2 = offset + processor.getRegister(src1)
        let dest = line[1].replace("$", "")
        let value = processor.getMemory(src2)
        processor.setRegister(dest, value)
        pc = pc+1
        valid=true
    } else if (line[0] === "sw") {
        let dest = line[2].split("(")
        let offset = parseInt(dest[0])
        let dest1 = dest[1].replace("$", "").replace(")", "")
        let dest2 = offset + processor.getRegister(dest1)
        let src = line[1].replace("$", "")
        let value = processor.getRegister(src)
        processor.setMemory(dest2, value)
        pc = pc+1
        valid=true
    }
    else if (line[0] === "sra") {
        let dest = line[1].replace("$", "");
        let src1 = line[3].replace("$", "");
        let src = line[2].replace("$", "");
        let val = processor.getRegister(src);
        let val1 = processor.getRegister(src1);
        let result = val >> val1; // Sağa kaydırma işlemi
        processor.setRegister(dest, result);
        pc = pc + 1;
        valid = true;
    }  
    
    else if (line[0] === "lb") {
        let offset = parseInt(line[2].split("(")[0]);
        let reg = line[2].split("(")[1].replace("$", "").replace(")", "");
        let dest = line[1].replace("$", "");
        let address = processor.getRegister(reg) + offset;
        let val = processor.getMemory(address, "byte");
        processor.setRegister(dest, val);
        pc = pc + 1;
        valid = true;
        }
    else if (line[0] === "sb") {
        let offset = parseInt(line[2].split("(")[0]);
        let reg = line[2].split("(")[1].replace("$", "").replace(")", "");
        let src = line[1].replace("$", "");
        let address = processor.getRegister(reg) + offset;
        let val = processor.getRegister(src) & 0xFF;
        processor.setMemory(address, val, "byte");
        pc = pc + 1;
        valid = true;
    }
    else if (line[0] === "mfhi") {
        let dest = line[1].replace("$", "");
        let val = processor.getRegister("hi");
        processor.setRegister(dest, val);
        pc = pc + 1;
        valid = true;
    }
    else if (line[0] === "mflo") {
        let dest = line[1].replace("$", "");
        let val = processor.getRegister("lo");
        processor.setRegister(dest, val);
        pc = pc + 1;
        valid = true;
    }
    else if (line[0] === "div") {
        // Divide the value in src1 by the value in src2 and store the quotient in dest
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, Math.floor(val1 / val2));
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
        pc = pc + 1; // increment the program counter
        valid = true; // set the valid flag to true
    }

    else if (line[0] === "xor") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 ^ val2);
        pc = pc + 1;
        valid = true;
    }
    else if (line[0] === "jal") {
        let dest = tags.get(line[1] + ":");
        processor.setRegister("$ra", pc + 1); // Save the return address in $ra
        pc = dest; // Jump to the specified address
        valid = true;
    } else if (line[0] === "syscall") {
        let code = processor.getRegister("v0");
        switch (code) {
            case 1:
                const text = processor.getRegister("a0");
                print = print + text + " ";
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
        valid = true;
    } else if (line[0] === "jr") {
        pc = pc + 1;
        valid = true;
    } else {
        pc = pc + 1;
    }
    if (pc === lines.length) {
        pc = 0;
    }
    if (!valid) {
        print =
            print + "\nInvalid instruction on line " + (currentPC + 1) + " ";
    }
    return [pc, print];
};

export default execute;
