import React from "react";
import { Collapse, Typography } from "antd";
import "./FAQ.css";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const FAQ = () => {
  const faqData = [
    {
      question: "Pathwise là gì?",
      answer: [
        "Pathwise là 1 program peer-to-peer mentorship dành cho sinh viên đại học ở Việt Nam, Mỹ, Úc, Canada và Singapore để tìm kiếm các cơ hội thực tập ở các tập đoàn, doanh nghiệp, phòng nghiên cứu (research lab) và kiếm việc làm full-time khi vừa ra trường. Với các mentor có nhiều kinh nghiệm, chúng mình sẽ giúp các mentee với resume, profile, projects, interview, và mở rộng connection trong các cộng đồng.",
      ],
    },
    {
      question: "Tại sao nên tham gia làm mentee vào Pathwise?",
      answer: [
        "Hiệu quả - Tập trung vào những kiến thức cụ thể và cô đọng nhất để phục vụ quá trình ứng tuyển vào các tập đoàn lớn.",
        "Tiết kiệm - Chi phí được tối ưu sao cho phù hợp với sinh viên nhất, và đảm bảo tiết kiệm hơn từ 60-70% so với thị trường.",
        "Quan tâm - Tất cả mentee đều được chăm sóc 1-1, với các kênh riêng và các buổi session cá nhân hóa cụ thể, và số lượng mentee được giới hạn để đảm bảo chất lượng tối đa.",
      ],
    },
    {
      question: "Ai có thể tham gia vào chương trình Pathwise?",
      answer: [
        "Tất cả các bạn sinh viên đang theo học đại học ở Việt Nam, Mỹ, Úc, Canada và Singapore mà muốn tìm kiếm cơ hội thực tập hoặc làm việc trong các research lab hay các công ty đều có thể tham gia. Mỗi đợt chương trình chỉ lấy 1 số lượng mentee có hạn nên hãy đăng ký tham gia sớm nhất nhé.",
      ],
    },
    {
      question: "Câu chuyện bắt đầu của Pathwise là gì?",
      answer: [
        "Xuất phát từ câu chuyện apply thực tập khốc liệt cạnh tranh tại Mỹ, apply từ 300-400 thực tập, rải đơn liên tục nhưng không nhận được interview nào, hoặc chỉ nhận được 1-3 interview, với tỉ lệ thấp đã trở nên quen thuộc.",
        "Trong thời gian đó, không có sự hỗ trợ từ các nguồn mentor, đội ngũ mentor của Pathwise đã phải tự tìm tòi, hỏi han khắp nơi, và kết quả hầu như về kiến thức lẫn tài liệu đều mơ hồ và không hề hiệu quả, lãng phí thời gian và mất phương hướng.",
        "Khi tìm kiếm mentor trên thị trường, bọn anh đã gặp phải các gói mentoring chi phí lên đến hơn 100-200 đô 1 giờ, hoặc rẻ hơn thì cũng 1-2000 đô cho 1 package hỗ trợ, thậm chí có những gói bắt cam kết đầu ra lên đến 10-15% tổng tháng lương năm đầu, nhưng không gói nào khiến anh cảm thấy thật sự “hiểu mình nhất”.",
        "Thời điểm đó bọn anh chỉ hy vọng có người đồng hành chỉ dẫn cho mình trong việc tìm kiếm và nộp đơn công ty hiệu quả, các tips và tricks để tăng khả năng nhận được phỏng vấn, cách luyện tập các đề thi sao cho đúng trọng tâm nhất, tìm kiếm network chất lượng, các tips phỏng vấn, hỗ trợ về nguồn tài liệu,...",
        "Và điều khó hơn là một người đã từng trải qua những quá trình mình gặp phải để có được những tư vấn sát nhất, hiểu được vấn đề đang diễn ra trực tiếp trên thị trường tuyển dụng, và trải qua cả những lúc “trầm cảm” , “nghi ngờ bản thân” - “imposter syndrome :)” - chứ không phải những mentor đã có nhiều năm kinh nghiệm trên thị trường lao động.",
        "“Đó là khi bọn anh tìm đến một người bạn khiến bọn anh cảm thấy yên tâm và tin tưởng”. Người có năng lực trong lĩnh vực công nghệ, đặc biệt phần mềm (software). Hiểu biết, tìm tòi với những kinh nghiệm đi trước hơn hẳn so với các bạn cùng tuổi (2002). Kinh nghiệm và kiến thức sâu nhưng đủ bao quát, hiệu quả và tiết kiệm nhất.",
      ],
    },
  ];

  return (
    <div className="faq-container">
      <Title level={2} className="faq-title">
        Frequently Asked Questions
      </Title>
      <Collapse accordion className="faq-collapse">
        {faqData.map((item, index) => (
          <Panel header={item.question} key={index} className="faq-panel">
            {item.answer.map((text, idx) => (
              <Text key={idx} className="faq-answer">
                {text}
              </Text>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQ;
