import { Router } from 'express';
const router = Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).json({
        hi: "hi"
    });
});
export default router;
//# sourceMappingURL=index.js.map