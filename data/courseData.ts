// C:\Users\mnb09\Desktop\Temp\data\courseData.ts

import { ImageSourcePropType } from 'react-native';

// --- 타입 정의 (이전과 동일) ---
export type Place = { id: string; name: string; category: string; address: string; coordinate: { latitude: number; longitude: number; }; description?: string; time?: string; thumbnail?: ImageSourcePropType; };
export type Course = { id: string; title: string; subtitle: string; thumbnail: ImageSourcePropType; author: string; likes: number; isMyCourse?: boolean; };
export type CourseDetail = { id: string; title: string; subtitle: string; author: string; description: string; places: Place[]; isMyCourse?: boolean; likes: number; };

// --- 데이터 목록 (let으로 선언하여 수정 가능하게 함) ---
export let savedCourses: Course[] = [
    { id: 'rec2', title: '예술 감성 산책 코스', subtitle: '수원화성박물관 → 공방거리 → 아트스페이스', thumbnail: require('../assets/images/mural_village.jpg'), author: '행궁동전문가', likes: 98 },
];
export let recommendedCourses: Course[] = [
  { id: 'rec1', title: '행궁동 맛집 투어', subtitle: '운멜로 → 방화수류정 → 수원전통문화관', thumbnail: require('../assets/images/chicken_street.jpg'), author: '느린행궁러버', likes: 120 },
  { id: 'rec2', title: '예술 감성 산책 코스', subtitle: '수원화성박물관 → 공방거리 → 아트스페이스', thumbnail: require('../assets/images/mural_village.jpg'), author: '행궁동전문가', likes: 98 },
];
export let myCourses: Course[] = [];

// 세부 정보 데이터
let courseDetailsData: CourseDetail[] = [
    { id: 'rec1', title: '행궁동 맛집 투어', subtitle: '운멜로 → 방화수류정 → 수원전통문화관', author: '느린행궁러버', description: '행궁동의 숨겨진 맛집들을 탐방하는 최고의 코스입니다. 친구 또는 연인과 함께 즐거운 시간을 보내세요!', places: [ { id: 'p1', name: '운멜로', category: '음식점', address: '경기도 수원시 팔달구 신풍로63번길 3-2 1층', coordinate: { latitude: 37.281, longitude: 127.015 }, time: '도보 10분', thumbnail: require('../assets/images/unmelo.jpg') }, { id: 'p2', name: '방화수류정', category: '명소', address: '경기 수원시 팔달구 수원천로392번길 44-6', coordinate: { latitude: 37.288, longitude: 127.018 }, time: '도보 15분', thumbnail: require('../assets/images/banghwasuryujeong.jpg') }, { id: 'p3', name: '수원전통문화관', category: '문화시설', address: '경기 수원시 팔달구 정조로 893', coordinate: { latitude: 37.289, longitude: 127.013 }, thumbnail: require('../assets/images/suwon_culture_center.jpg') } ], likes: 120 },
    { id: 'rec2', title: '예술 감성 산책 코스', subtitle: '수원화성박물관 → 공방거리 → 아트스페이스', author: '행궁동전문가', description: '고요한 박물관에서 시작하여 활기찬 공방거리를 거쳐 현대적인 아트스페이스에서 마무리하는 예술적인 하루를 경험해보세요.', places: [ { id: 'p4', name: '수원화성박물관', category: '문화시설', address: '경기도 수원시 팔달구 창룡대로 21', coordinate: { latitude: 37.284, longitude: 127.020 }, time: '도보 5분', thumbnail: require('../assets/images/suwon_hwaseong_museum.jpg') }, { id: 'p5', name: '행궁동 공방거리', category: '명소', address: '경기도 수원시 팔달구 행궁로 18', coordinate: { latitude: 37.280, longitude: 127.013 }, time: '도보 12분', thumbnail: require('../assets/images/craft_street.jpg') }, { id: 'p6', name: '아트스페이스 광교', category: '미술관', address: '경기도 수원시 영통구 광교중앙로 140', coordinate: { latitude: 37.288, longitude: 127.051 }, thumbnail: require('../assets/images/art_space_gwanggyo.jpg') } ], likes: 98 },
];
export let allCourses: Course[] = [...recommendedCourses, ...myCourses];

// 빠른 조회를 위한 Map 데이터
export const courseDetailsMap = new Map<string, CourseDetail>(
  courseDetailsData.map(course => [course.id, course])
);

// 모든 장소 데이터 (let으로 선언)
export let allPlaces: Place[] = [
    { id: 'p1', name: '운멜로', category: '음식점', address: '경기도 수원시 팔달구 신풍로63번길 3-2 1층', coordinate: { latitude: 37.281, longitude: 127.015 }, time: '도보 10분', thumbnail: require('../assets/images/unmelo.jpg') },
    { id: 'p2', name: '방화수류정', category: '명소', address: '경기 수원시 팔달구 수원천로392번길 44-6', coordinate: { latitude: 37.288, longitude: 127.018 }, time: '도보 15분', thumbnail: require('../assets/images/banghwasuryujeong.jpg') },
    { id: 'p3', name: '수원전통문화관', category: '문화시설', address: '경기 수원시 팔달구 정조로 893', coordinate: { latitude: 37.289, longitude: 127.013 }, thumbnail: require('../assets/images/suwon_culture_center.jpg') },
    { id: 'p4', name: '수원화성박물관', category: '문화시설', address: '경기도 수원시 팔달구 창룡대로 21', coordinate: { latitude: 37.284, longitude: 127.020 }, time: '도보 5분', thumbnail: require('../assets/images/suwon_hwaseong_museum.jpg') },
    { id: 'p5', name: '행궁동 공방거리', category: '명소', address: '경기도 수원시 팔달구 행궁로 18', coordinate: { latitude: 37.280, longitude: 127.013 }, time: '도보 12분', thumbnail: require('../assets/images/craft_street.jpg') },
    { id: 'p6', name: '아트스페이스 광교', category: '미술관', address: '경기도 수원시 영통구 광교중앙로 140', coordinate: { latitude: 37.288, longitude: 127.051 }, thumbnail: require('../assets/images/art_space_gwanggyo.jpg') },
    { id: 'p7', name: '플라잉수원', category: '체험', address: '경기도 수원시 팔달구 경수대로697번길 27', coordinate: { latitude: 37.279, longitude: 127.024 }, thumbnail: require('../assets/images/flying_suwon.jpg') },
    { id: 'p8', name: '수원 시립 아이파크 미술관', category: '미술관', address: '경기 수원시 팔달구 정조로 833', coordinate: { latitude: 37.280, longitude: 127.012 }, thumbnail: require('../assets/images/ipark_museum.jpg') },
];

export const toggleSaveCourse = (course: Course | CourseDetail) => {
    const index = savedCourses.findIndex(c => c.id === course.id);
    if (index > -1) {
        savedCourses.splice(index, 1);
    } else {
        const summaryCourse = 'places' in course ? { id: course.id, title: course.title, subtitle: course.subtitle, thumbnail: course.places[0]?.thumbnail || require('../assets/images/default_thumbnail.png'), author: course.author, likes: course.likes, isMyCourse: course.isMyCourse } : course;
        savedCourses.unshift(summaryCourse);
    }
};

export const saveCourse = (courseData: { id?: string; title: string; description: string; places: Place[]; }) => {
    const newSubtitle = courseData.places.map(p => p.name).join(' → ');

    if (courseData.id) {
        // --- 1. 수정 로직 ---
        const courseId = courseData.id;
        const updatedDetail: CourseDetail = { ...(courseDetailsMap.get(courseId)!), ...courseData, subtitle: newSubtitle };
        courseDetailsMap.set(courseId, updatedDetail);
        
        const detailIndex = courseDetailsData.findIndex(c => c.id === courseId);
        if (detailIndex > -1) courseDetailsData[detailIndex] = updatedDetail;

        [myCourses, recommendedCourses, savedCourses, allCourses].forEach(arr => {
            const index = arr.findIndex(c => c.id === courseId);
            if (index > -1) {
                arr[index].title = updatedDetail.title;
                arr[index].subtitle = updatedDetail.subtitle;
            }
        });

    } else {
        // --- 2. 생성 로직 ---
        const newCourseId = `my_${Date.now()}`;
        const newCourseDetail: CourseDetail = {
            id: newCourseId,
            title: courseData.title,
            description: courseData.description,
            places: courseData.places,
            subtitle: newSubtitle,
            author: '나',
            likes: 0,
            isMyCourse: true,
        };
        
        const newCourseSummary: Course = {
            id: newCourseDetail.id,
            title: newCourseDetail.title,
            subtitle: newCourseDetail.subtitle,
            thumbnail: newCourseDetail.places[0]?.thumbnail || require('../assets/images/flying_suwon.jpg'),
            author: newCourseDetail.author,
            likes: newCourseDetail.likes,
            isMyCourse: true,
        };

        courseDetailsData.unshift(newCourseDetail);
        courseDetailsMap.set(newCourseId, newCourseDetail);
        myCourses.unshift(newCourseSummary);
        allCourses.unshift(newCourseSummary);
    }
};

// [오류 수정] 'deleteCourse' 함수를 정의하고 export 합니다.
export const deleteCourse = (courseId: string) => {
    // 1. 모든 요약 목록에서 해당 코스 제거
    allCourses = allCourses.filter(c => c.id !== courseId);
    myCourses = myCourses.filter(c => c.id !== courseId);
    savedCourses = savedCourses.filter(c => c.id !== courseId);
    recommendedCourses = recommendedCourses.filter(c => c.id !== courseId);

    // 2. 상세 정보 목록과 맵에서 해당 코스 제거
    courseDetailsData = courseDetailsData.filter(c => c.id !== courseId);
    courseDetailsMap.delete(courseId);
};