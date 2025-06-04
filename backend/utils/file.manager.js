import fs from 'fs';


const readData = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const writeData = (file, data) => {
    const dataList = readData(file);

    const index = dataList.findIndex((u) => u._id === _id);
    if (index !== -1) {
        dataList[index] = data;
        fs.writeFileSync(file, JSON.stringify(dataList, null, 2));
    }else{
        dataList.push(data);
        fs.writeFileSync(file, JSON.stringify(dataList, null, 2));
    }    
}

export { readData, writeData };

