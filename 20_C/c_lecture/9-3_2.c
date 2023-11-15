#include <stdio.h>

main()
{
	int arr[5];
	int max, min, sum, i;
	
	for (i = 0; i < 5; i++) {
		printf("입력 = ");
		scanf_s("%d", &arr[i]); // 배열요소 안의 특정 값 입력받을 시 & 연산자를 붙여야 함
	}

	max = min = sum = arr[0]; // 가장 마지막 값(arr[0])이 앞에 전부 들어감을 의미함

	for (i = 1; i < 5; i++) {
		sum += arr[i];
		if (max < arr[i]) max = arr[i];
		if (min > arr[i]) min = arr[i];
	}
	printf("\n최대값 = %d \n", max);
	printf("최소값 = %d \n", min);
	printf("총 합 = %d \n\n", sum);
}