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
export let myCourses: Course[] = [
  { id: 'my1', title: '나만의 야경 명소 탐방', subtitle: '화홍문 → 방화수류정 → 연무대', thumbnail: require('../assets/images/flying_suwon.jpg'), author: '나', likes: 25, isMyCourse: true },
];
let courseDetailsData: CourseDetail[] = [
  { id: 'rec1', title: '행궁동 맛집 투어', subtitle: '느린행궁이 추천하는 행궁동 맛집 정복 코스', author: '느린행궁러버', description: '행궁동의 진짜 맛집들을 탐방하며 즐거운 시간을 보내보세요. 이 코스는 현지인들이 자주 찾는 숨겨진 맛집 위주로 구성되어 있습니다.', places: [ { id: 'p1', name: '운멜로 1호점', category: '음식점', address: '수원시 팔달구 화서문로32번길 4 2층', coordinate: { latitude: 37.289, longitude: 127.016 } }, { id: 'p2', name: '방화수류정', category: '명소', address: '수원시 팔달구 수원천로392번길 44-6', time: '도보 8분 · 약 600m', coordinate: { latitude: 37.290, longitude: 127.018 } }, { id: 'p3', name: '수원전통문화관', category: '문화시설', address: '수원시 팔달구 정조로 899', time: '도보 5분 · 약 400m', coordinate: { latitude: 37.291, longitude: 127.019 } } ], isMyCourse: false, likes: 120 },
  { id: 'rec2', title: '예술 감성 산책 코스', subtitle: '수원화성박물관부터 아트스페이스까지, 예술적 영감을 얻는 길', author: '행궁동전문가', description: '박물관에서 역사를 배우고, 공방거리에서 장인의 숨결을 느끼며, 현대 미술로 마무리하는 완벽한 예술 코스입니다.', places: [ { id: 'p10', name: '수원화성박물관', category: '문화시설', address: '수원시 팔달구 창룡대로 21', coordinate: { latitude: 37.283, longitude: 127.018 } }, { id: 'p11', name: '행궁동 공방거리', category: '문화/예술', address: '수원시 팔달구 행궁로 18', time: '도보 10분 · 약 750m', coordinate: { latitude: 37.287, longitude: 127.014 } }, { id: 'p12', name: '수원시립아트스페이스', category: '문화/예술', address: '수원시 장안구 송정로 19', time: '도보 15분 · 약 1.1km', coordinate: { latitude: 37.294, longitude: 127.011 } } ], isMyCourse: false, likes: 98 },
  { id: 'my1', title: '나만의 야경 명소 탐방', subtitle: '고요한 밤, 행궁동의 빛을 따라서', author: '나', description: '사람들이 잘 모르는 저만의 야경 포인트를 연결한 코스입니다. 조용히 산책하며 행궁동의 밤을 즐기고 싶을 때 추천합니다.', places: [ { id: 'p4', name: '화홍문', category: '명소', address: '수원시 팔달구 수원천로 391', coordinate: { latitude: 37.2915, longitude: 127.0185 } }, { id: 'p5', name: '방화수류정', category: '명소', address: '수원시 팔달구 수원천로392번길 44-6', time: '도보 3분 · 약 200m', coordinate: { latitude: 37.290, longitude: 127.018 } }, { id: 'p6', name: '연무대', category: '명소', address: '수원시 팔달구 창룡대로103번길 10', time: '도보 10분 · 약 800m', coordinate: { latitude: 37.288, longitude: 127.025 } } ], isMyCourse: true, likes: 25 },
  { id: 'rec3', title: '혼자 걷기 좋은 길', subtitle: '서장대에서 화서문까지, 성곽길을 따라 걷는 사색의 시간', author: '사색가', description: '수원 화성의 아름다운 성곽을 따라 걸으며 생각을 정리하기 좋은 코스입니다. 특히 해질녘 풍경이 아름답습니다.', places: [ { id: 'p13', name: '서장대', category: '명소', address: '수원시 팔달구 남창동 산 2-1', coordinate: { latitude: 37.283, longitude: 127.011 } }, { id: 'p14', name: '서노대', category: '명소', address: '수원시 팔달구 남창동', time: '도보 5분 · 약 350m', coordinate: { latitude: 37.285, longitude: 127.010 } }, { id: 'p15', name: '화서문', category: '명소', address: '수원시 팔달구 장안동 333', time: '도보 7분 · 약 500m', coordinate: { latitude: 37.288, longitude: 127.011 } } ], isMyCourse: false, likes: 77 }
];
export let courseDetailsMap = new Map<string, CourseDetail>(courseDetailsData.map(course => [course.id, course]));
export let allCourses: Course[] = [
    { id: 'rec1', title: '행궁동 맛집 투어', subtitle: '운멜로 → 방화수류정 → 수원전통문화관', thumbnail: require('../assets/images/chicken_street.jpg'), author: '느린행궁러버', likes: 120 },
    { id: 'rec2', title: '예술 감성 산책 코스', subtitle: '수원화성박물관 → 공방거리 → 아트스페이스', thumbnail: require('../assets/images/mural_village.jpg'), author: '행궁동전문가', likes: 98 },
    { id: 'my1', title: '나만의 야경 명소 탐방', subtitle: '화홍문 → 방화수류정 → 연무대', thumbnail: require('../assets/images/flying_suwon.jpg'), author: '나', likes: 25, isMyCourse: true },
    { id: 'rec3', title: '혼자 걷기 좋은 길', subtitle: '서장대 → 서노대 → 화서문', thumbnail: require('../assets/images/onmelo_interior.jpg'), author: '사색가', likes: 77 },
];
export const allPlaces: Place[] = courseDetailsData.flatMap(course => course.places).reduce((acc: Place[], place) => {
    if (!acc.find(p => p.id === place.id)) { acc.push(place); }
    return acc;
}, []);


// --- 데이터 조작 함수 ---

export const toggleSaveCourse = (course: Course | CourseDetail) => {
    const courseSummary: Course = {
        id: course.id, title: course.title, subtitle: course.subtitle,
        thumbnail: allCourses.find(c => c.id === course.id)!.thumbnail,
        author: course.author, likes: course.likes, isMyCourse: course.isMyCourse,
    };
    const index = savedCourses.findIndex(c => c.id === course.id);
    if (index > -1) { savedCourses = savedCourses.filter(c => c.id !== course.id); return false; } 
    else { savedCourses = [courseSummary, ...savedCourses]; return true; }
};

/**
 * BUG FIX (1): 코스 정보 저장 및 업데이트 함수 로직 전체 수정
 */
export const saveCourse = (courseData: Pick<CourseDetail, 'title' | 'description' | 'places'> & { id?: string }) => {
    const isEditing = !!courseData.id;
    const newSubtitle = courseData.places.map(p => p.name).slice(0, 3).join(' → ');

    if (isEditing) {
        // --- 1. 수정 로직 ---
        const courseId = courseData.id!;
        const existingDetail = courseDetailsMap.get(courseId);
        if (!existingDetail) return;

        // 상세 정보 업데이트
        const updatedDetail: CourseDetail = {
            ...existingDetail,
            title: courseData.title,
            description: courseData.description,
            places: courseData.places,
            subtitle: newSubtitle,
        };
        courseDetailsMap.set(courseId, updatedDetail);

        // 요약 정보 배열들 (myCourses, allCourses 등)도 업데이트
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

        // 모든 관련 데이터 목록에 새로 추가
        courseDetailsData.unshift(newCourseDetail); // 상세 데이터 배열에 추가
        courseDetailsMap.set(newCourseId, newCourseDetail); // 맵에 추가
        myCourses.unshift(newCourseSummary); // '나의 코스' 목록에 추가
        allCourses.unshift(newCourseSummary); // '전체 코스' 목록에도 추가
    }
};
