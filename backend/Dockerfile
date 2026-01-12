# Giai đoạn 1: Build (Dùng Maven)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Giai đoạn 2: Run (Dùng bản JRE chuẩn)
# Đã sửa lại tag chỗ này
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copy file jar từ giai đoạn 1 sang
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]