import { useEffect, useState } from "react";
import { Card, Descriptions, Carousel, Spin, Tag, Rate } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AccommodationDetail() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL_PUBLIC}/accommodations/${id}`
        );
        setAccommodation(res.data.data);
      } catch (err) {
        console.error("Error fetching accommodation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [id]);

  if (loading) return <Spin size="large" style={{ marginTop: 70 }} />;

  if (!accommodation) return <p>Không tìm thấy cơ sở lưu trú.</p>;

  return (
    <div
      style={{
        maxWidth: 1150,
        margin: "80px auto",
        padding: 20,
        height: 550,
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Thông tin chi tiết */}
        <div style={{ flex: 1 }}>
          <Card
            variant="bordered"
            title={
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                Thông tin accommodation chi tiết
              </span>
            }
          >
            <Descriptions column={1}>
              <Descriptions.Item label="Tên">
                {accommodation.name}
              </Descriptions.Item>

              <Descriptions.Item label="Loại">
                {accommodation.type === "hotel" && <>🏨 Hotel</>}
                {accommodation.type === "cruise" && <>🛳 Cruise</>}
              </Descriptions.Item>

              <Descriptions.Item label="Địa chỉ">
                {accommodation.address}
              </Descriptions.Item>

              <Descriptions.Item label="Khu vực">
                📍 {accommodation.location.name} - {accommodation.location.city}
              </Descriptions.Item>

              <Descriptions.Item label="Xếp hạng sao">
                <Rate disabled defaultValue={accommodation.starRating} />
              </Descriptions.Item>

              <Descriptions.Item label="Tiện ích">
                {accommodation.amenities}
              </Descriptions.Item>

              <Descriptions.Item label="Giá cơ bản">
                <span style={{ color: "#2e703b", fontWeight: "bold" }}>
                  {accommodation.basePrice.toLocaleString()} VND
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Trạng thái">
                {accommodation.status === "available" && (
                  <Tag color="green">Available</Tag>
                )}
                {accommodation.status === "unavailable" && (
                  <Tag color="red">Unavailable</Tag>
                )}
                {accommodation.status === "maintenance" && (
                  <Tag color="orange">Maintenance</Tag>
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Mô tả">
                {accommodation.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
        <Card variant="bordered" style={{ width: 550 }}>
          <Carousel autoplay dots={true} draggable>
            {accommodation.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`accommodation-img-${idx}`}
                style={{
                  width: "80%",
                  height: 500,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            ))}
          </Carousel>
        </Card>
      </div>
    </div>
  );
}
