#include <stdio.h>

// 전역변수 - 권장하지 않음
int dummy_cnt;

dummy_func()
{
	printf("dummy_call (%d) \n\n", dummy_cnt++);
}

main()
{
	/* -------------------------------------------- */
	//Debug 활용하기
	/* -------------------------------------------- */
	// Ctrl+F5       : 디버그 없이 실행
	// F5            : 디버그 모드로 실행
	// F9            : 중단점(breakpoint) 설정/해제
	// F10           : 프로시저 단위 실행
	// F11           : 라인단위 실행
	// Shift+F5      : 실행중인 디버그 중지
	// Ctrl+Shift+F5 : 디버그 재시작
	// Ctrl+F10      : 현재 커서까지 디버깅 실행

	int i = 10, j = 20, sum = 0;

	dummy_cnt = 0; // 전역변수 초기화

	i++;
	dummy_func();

	++j;
	dummy_func();

	sum += i + j++; // sum = sum + i + j++
	dummy_func();

	// sum 의 값에 주목
	printf("i=%d j=%d sum=%d \n\n", i, j, sum);
	dummy_func();
}