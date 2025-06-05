import fs from 'fs';


const readData = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const writeData = (file, data) => {
    const dataList = readData(file);

    const index = dataList.findIndex((u) => u._id === data._id);
    if (index !== -1) {
        dataList[index] = data;
        fs.writeFileSync(file, JSON.stringify(dataList, null, 2));
    }else{
        dataList.push(data);
        fs.writeFileSync(file, JSON.stringify(dataList, null, 2));
    }    
}

const removeData = (file, _id) => {
    const dataList = readData(file);
    const updatedDataList = dataList.filter((u) => u._id !== _id);
    fs.writeFileSync(file, JSON.stringify(updatedDataList, null, 2));
}

export { readData, removeData, writeData };

