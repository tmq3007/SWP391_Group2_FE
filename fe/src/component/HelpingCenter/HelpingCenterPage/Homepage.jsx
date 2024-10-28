export const Homepage = () => {
    return (
        <div style={{display: 'flex', padding: '20px'}}>
            <div style={{width: '25%', paddingRight: '20px'}}>
                <h2>Mua Sắm Cùng Shopee</h2>
                <ul>
                    <li>Người dùng mới</li>
                    <li>Thao tác</li>
                    <li>Tính năng của Shopee</li>
                    <li>Khám phá</li>
                    {/* Add more menu items here */}
                </ul>
            </div>
            <div style={{width: '75%'}}>
                <h2>Khám phá</h2>
                <ul>
                    <li>Tôi Có Thể Xem Lại Các Shop Đã Bấm "Theo Dõi" Ở Đâu?</li>
                    <li>Shopee có cung cấp bảo hiểm hàng hóa cho đơn hàng của tôi không?</li>
                    <li>Tại Sao Không Bình Luận Được Trên Shopee Livestream?</li>
                    {/* Add more help articles here */}
                </ul>
            </div>
        </div>
    );
}