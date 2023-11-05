const express = require("express");
const cart = require("../schemas/cart.js");
const { listIndexes } = require("../schemas/products.schema.js");
const router = express.Router();
const Products = require("../schemas/products.schema.js");

// 상품 등록.
router.post("/products", async (req, res) => {
    try {
        const { title, content, author, password } = req.body; //구조분해할당
        console.log(req.body);
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        let day = currentDate.getDate();
        let hours = currentDate.getHours(); // 시간
        let minutes = currentDate.getMinutes(); // 분
        let seconds = currentDate.getSeconds(); // 초
        let date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        await Products.create({
            title: title,
            content: content,
            author: author,
            password: password,
            createdAt: date,
            status: "for sale"
        });

        res.json({
            "message": "판매 상품을 등록하였습니다."
        });
    }
    catch {
        res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' })
    }
})

//상품 조회
router.get("/products", async (req, res) => {
    const products = await Products.find({});

    res.status(200).json({ products })
});


// 상세 조회
router.get("/products/:productId", async (req, res) => {
    try {
        console.log(req.params)

        const { productId } = req.params;
        const products = await Products.find({});

        const product = products.filter((p) => productId === p._id.toString()); // p는 필터 돌려고 만든거 같음
        if (product.length === 0) {
            return res.status(400).json({ message: "상품 조회에 실패하였습니다." });
        }
        return res.status(200).json({ data: product[0] })
    }
    catch {
        return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' })
    }
});

//---------------------------------- 여기까지 다 떠먹여주셨습니다... 다형님께서
//아래는 가이드 받고 제가 해보았습니다. 오류 난 것은 그냥 쥐피티로 해결 할까 하다가 그냥 두었습니다.
//모르면 모르는대로... 있는 모습 그대로 제출하는게 맞는 것 같다고 생각했습니다.... 


// 상품 수정
// await Products.updateOne({ _id:id },{title,content,author}) 일괄 수정용으로 받은 코드
// 

router.put("/products/:productId", async (req, res) => {
    //아이디랑 바디 받기 updateOne( // 하나만 수정하는 코드
    const { productId } = req.params;
    const { title, content, password, status } = req.body;

    // 일괄 수정
    const existsProducts = await Products.find({ _id: productId });
    try {
        if (existsProducts.length === 0) {
            await Product.updateOne(
                { _id: productId },
                {$set:
                    {
                        title: title,
                        content: content,
                        password: password,
                        status: status
                        // author:author -> 바디에 이게 없슴다 ㅜㅠㅠ 그래서 안되나 하고 주석 해보았습니다.
                    }
                }
            );
            res.status(200).json({ success: true, message: "상품 정보 수정했습니다." });
        } else {
            res.status(400).json({ success: false, message: "상품이 존재하지 않습니다." });
        }
    }
 //상품 수정할 권한이 없다. -> 비밀번호 불일치 만들어야 함.......
    catch {
        return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' })
    }

});


// 상품 삭제
router.delete("/products/:productId", async(req, res) => {
    const { productId } = req.params;

    // await Cart.deleteOne({_id:productId});
    const existsProducts = await cart.find({ productId });
    if (existsProducts.length) {
        await Product.deletOne({ _id: productId });
    }

    res.json({ message: "상품을 삭제하였습니다." });
})

module.exports = router;

// 엄마 보고 싶어요 엄마 말이 다 맞았어요 엄마 잘못했어요



//챗 쥐피티 put
// router.put("/products/:productId", async (req, res) => {
//     const { productId } = req.params;
//     const { title, content, author } = req.body;

//     // 일괄 수정
//     const existsProduct = await Products.findById(productId);
//     if (existsProduct) {
//         existsProduct.title = title;
//         existsProduct.content = content;
//         // existsProduct.author = author;

//         await existsProduct.save();
//         res.status(200).json({ success: true });
//     } else {
//         res.status(400).json({ success: false, message: "상품이 존재하지 않습니다." });
//     }
// });