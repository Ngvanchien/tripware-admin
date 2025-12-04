import { useEffect, useState } from "react";
import { Card, Descriptions, Carousel, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rate, Tag } from "antd";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL_PUBLIC}/rooms/${id}`
        );
        setRoom(res.data.data);
      } catch (err) {
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <Spin size="large" style={{ marginTop: 50 }} />;

  if (!room) return <p>Không tìm thấy phòng.</p>;

  return (
    <div style={{ maxWidth: 1200, marginTop: 60, padding: 30 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Card
            title={
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                Thông tin chi tiết phòng
              </span>
            }
            variant="bordered"
          >
            <Descriptions column={1}>
              <Descriptions.Item label="Tên phòng">
                {room.roomName}
              </Descriptions.Item>
              <Descriptions.Item label="Loại phòng">
                {room.roomType}
              </Descriptions.Item>
              <Descriptions.Item label="Sức chứa">
                🧑‍🤝‍🧑 {room.capacity} người
              </Descriptions.Item>
              <Descriptions.Item label="Giá / đêm">
                <span style={{ color: "#2e703bff", fontWeight: "bold" }}>
                  {room.pricePerNight.toLocaleString()} VND
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Diện tích">
                📐 {room.sizeM2} m²
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {room.status === "available" && (
                  <Tag color="green">Available</Tag>
                )}
                {room.status === "booked" && <Tag color="red">Booked</Tag>}
                {room.status === "maintenance" && (
                  <Tag color="orange">Maintenance</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {room.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <Card
          variant="bordered"
          style={{
            width: 500,
          }}
        >
          <Carousel autoplay dots={true} draggable>
            {room.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`room-img-${idx}`}
                style={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            ))}
          </Carousel>
        </Card>
      </div>

      <Card title="Thông tin cơ sở lưu trú" style={{ marginTop: 10 }}>
        <Descriptions column={1}>
          <Descriptions.Item label="Tên khách sạn">
            {room.accommodation.name}
          </Descriptions.Item>
          <Descriptions.Item label="Loại">
            {room.accommodation.type === "hotel" && <>🏨 Hotel</>}
            {room.accommodation.type === "cruise" && <>🛳 Cruise</>}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {room.accommodation.address}
          </Descriptions.Item>
          <Descriptions.Item label="Xếp hạng sao">
            <Rate disabled defaultValue={room.accommodation.starRating} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
