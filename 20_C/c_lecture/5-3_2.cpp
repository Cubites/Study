#include <stdio.h>

main()
{
	printf("만족도를 선택하십시오 (1: 아주만족 ~ 5: 아주불만) : ");
	int score;
	scanf_s("%d", &score);
	int good = 0, nomal = 0, bad = 0, people = 0;


	if (1 <= score <= 5) {
		printf("1, 2, 3, 4, 5 중 하나의 숫자만 입력하십시오.");
	}
	else {
		people += 1;
		switch (score)
		{
			case 1;
				printf("현재까지의 투표결과는 참석자 총 %d 명중에서\n", people);
				printf("만족 : %d 명 보통 : %d 명 불만 %d 명 입니다.\n", good, nomal, bad);
		}
	}
}